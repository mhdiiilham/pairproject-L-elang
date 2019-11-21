'use strict'
const { User, Item, Category, UserItem } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const emailConfirm = require('../helpers/emailConfirmation')

class userController {
    static register(req, res) {
        let user = req.session.user
        Category.findAll()
        .then(categories=> {
            res.render('./user/register',{ error: null, user, list: categories })
        })
    }
    static create(req, res) {
        let salt = `${Math.floor(Math.random()*6)+10000}`
        let data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            salt: salt
        }
        let user = req.session.user
        User.create(data)
            .then((user)=> {
                emailConfirm(req.body.email, salt)
                res.redirect('/user/confirm')
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
                if(bcrypt.compare(req.body.password, user.password) && user.isActive) {
                    req.session.user = {
                        id: user.id,
                        name: user.fullname(),
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role,
                        isActive: user.isActive
                    }
                    let hour = 3600000;
                    req.session.cookie.expires = new Date(Date.now() + hour);
                    if(req.session.user.role !== 'admin') {
                        res.redirect('/user/profile')
                    }
                    else {
                        res.redirect('/item')
                    }
                }
                else if (bcrypt.compare(req.body.password, user.password) && !user.isActive) {
                    Category.findAll()
                    .then(categories=> {
                        res.render('./user/confirm', {error: "Harap input code konfirmasi", page: 'secret', user: req.session.user, list: categories})
                     })
                    .catch(eer=>{
                        res.send(err)
                    })
                } else {
                    Category.findAll()
                    .then(categories=>{
                        // res.send(categories)
                        res.render('./user/login', {err: "email / password salah", user: null, list: categories})
                    })
                };
            })
            .catch(err=> {
                Category.findAll()
                .then(categories=>{
                    res.render('./user/login', {err: "email / password salah", user: null, list: categories})
                })
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
                res.redirect('/user/profile');
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
    };
    static bidPOST(req, res) {
        let dataCategory = null
        Category.findAll()
        .then(categories=> {
            dataCategory = categories
            return UserItem.create(req.body)
        })
        .then(()=>{
            res.redirect('/user/profile')
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static editUpdate(req, res) {
        User.update(req.body, {where: { id: Number(req.body.id) }})
            .then(()=>{
                res.redirect('/user/profile');
            })
            .catch(err=>{
                res.send(err)
            })
    }
    static isActivePage(req, res) {
        let userSession = req.session.user
        Category.findAll()
            .then(categories=> {
                res.render('./user/confirm', {error: null, page: 'secret', user: req.session.user, list: categories})
            })
            .catch(eer=>{
                res.send(err)
            })
    }
    static isActive(req, res) {
        User.findOne({ where: { email: req.body.email } })
        .then(user=>{
            if(req.body.code.toString() === user.salt){
                User.update({isActive: true}, { where: { id: user.id } })
                .then(()=>{
                    res.redirect('/user/profile');
                })
                .catch(err=>{
                    res.send(err)
                })
            }
            else {
                Category.findAll()
                .then(categories=> {
                    res.render('./user/confirm', {error: "Maaf Code Anda Salah", page: 'secret', user: req.session.user, list: categories})
                 })
                .catch(eer=>{
                    res.send(err)
                })
            }
        })
        .catch(err=>{
            res.send(err)
        })
    }
}


module.exports = userController