'use strict'
const { User, Item } = require('../models')
const bcrypt = require('../helpers/bcrypt')

class userController {
    static register(req, res) {
        let user = req.session.user
        res.render('./user/register',{ error: null, user })
    }
    static create(req, res) {
        let user = req.session.user
        User.create(req.body)
            .then((user)=> {
                res.redirect('/home')
            })
            .catch(err=> {
                res.render('./user/register', { error: err.errors[0].message, user })
            });
    }
    static admin(req, res) {
        let user = req.session.user
        res.render('./user/admin', {error: null, user})
    }
    static loginPage(req, res) {
        res.render('./user/login', {err:null, user: null})
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
                    res.render('./user/login', {err: "email/password salah", user: null})
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
    static profilePage(req, res, next) {
        let userSession = req.session.user
        if(!userSession) {
            res.redirect('/')
        }
        else {
            if(userSession.role !== 'admin') {
                User.findByPk(userSession.id,
                    { include: { model: Item } }
                )
                .then(userData=>{
                    for(let i =0 ; i < userData.Items.length; i++) {
                        userData.Items[i].image = new Buffer(userData.Items[i].image).toString('base64')
                    }
                    res.render('./user/profilepage', {user: userSession, data: userData})
                })
                .catch(err=>{
                    res.send(err)
                })
            }
        }
    }
    static isAdmin(req, res, next) {
        let userSession = req.session.user
        if(!userSession) {
            res.redirect('/');
        }
        else {
            res.render('./user/admin', {error: null, page: 'secret', user: req.session.user})
        }
    }
    static isAdminTrue(req, res) {
        let userSession = req.session.user
        let { admin } = req.body
        if(admin !== 'B4caDokum3nT4s!') {
            res.redirect('/')
        }
        else {
            User.update(
                { role: 'admin' },
                { where: { id: userSession.id  } }
            )
            .then(()=> {
                res.send('udah jadi admin');
            })
            .catch(err=> {
                res.send(err);
            });
        };
    };
}


module.exports = userController