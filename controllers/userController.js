'use strict'
const { User, Item, Category } = require('../models')
const bcrypt = require('../helpers/bcrypt')

class userController {
    static register(req, res) {
        let user = req.session.user
        Category.findAll()
        .then(categories=> {
            res.render('./user/register',{ error: null, user, list: categories })
        })
    }
    static create(req, res) {
        let user = req.session.user
        User.create(req.body)
            .then((user)=> {
                res.redirect('/home')
            })
            .catch(err=> {
                Category.findAll()
                .then(categories=> {
                    res.render('./user/register', { error: err.errors[0].message, user, list: categories })
                })
                .catch(err=> {
                    res.send(err)
                })
            });
    }
    static admin(req, res) {
        let user = req.session.user
        Category.findAll()
        .then(categories=> {
            res.render('./user/admin', {error: null, user, list: categories})
        })
    }
    static loginPage(req, res) {
        Category.findAll()
        .then(categories=>{
            res.render('./user/login', {err:null, user: null, list: categories})
        })
    }
    static loginAttempt(req, res) {
        User.findOne({where: {email: req.body.email}})
            .then(user=> {
                if(bcrypt.compare(req.body.password, user.password)) {
                    req.session.user = {
                        id: user.id,
                        name: user.fullname(),
                        email: user.email,
                        role: user.role
                    }
                    let hour = 3600000;
                    req.session.cookie.expires = new Date(Date.now() + hour);
                    if(req.session.user.role !== 'admin') {
                        res.redirect('/user/profile')
                    }
                    else {
                        res.send('tampilan Admin')
                    }
                }
                else {
                    Category.findAll()
                    .then(categories=>{
                        res.render('./user/login', {err: "email/password salah", user: null, list: categories})
                    })
                };
            })
            .catch(err=> {
                res.render('./user/login', {err, user: null})
            });
    }
    static logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
    static profilePage(req, res) {
        let userSession = req.session.user
        if(userSession.role !== 'admin') {
            User.findByPk(userSession.id,
                { include: { model: Item } }
            )
            .then(userData=>{
                for(let i =0 ; i < userData.Items.length; i++) {
                    userData.Items[i].image = new Buffer(userData.Items[i].image).toString('base64')
                }
                Category.findAll()
                .then(categories=>{
                    res.render('./user/profilepage', {user: userSession, data: userData, list: categories})
                })
            })
            .catch(err=>{
                res.send(err)
            })
        }
        else {
            res.send('profileAdmin')
        }
    }
    static isAdmin(req, res) {
        let userSession = req.session.user
        Category.findAll()
            .then(categories=> {
                res.render('./user/admin', {error: null, page: 'secret', user: req.session.user, list: categories})
            })
            .catch(eer=>{
                res.send(err)
            })
    }
    static isAdminTrue(req, res) {
        let userSession = req.session.user
        let { admin } = req.body
        if(admin !== 'B4caDokum3nT4s!') {
            // redirect ke home
            res.redirect('/')
        }
        else {
            User.update(
                { role: 'admin' },
                { where: { id: userSession.id  } }
            )
            .then(()=> {
                // redirect ke halaman profile admin
                res.send('udah jadi admin');
            })
            .catch(err=> {
                res.send(err);
            });
        };
    };
    static bidPage(req, res) {
        let userSession = req.session.user
        let list = null
        Category.findAll()
        .then(categories=> {
          list = categories
          return Item.findByPk(req.params.id, {include: [User]})
        })
        .then(data=> {
          data.image = new Buffer(data.image).toString('base64')
          res.render('bidpage', { user: req.session.user, categories: list, data, userSession })
        })
        .catch(err=>{
          res.send(err);
        });
      }
}


module.exports = userController