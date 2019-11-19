'use strict'
const { User, Item } = require('../models')
const bcrypt = require('../helpers/bcrypt')

class userController {
    static register(req, res) {
        let user = null
        res.render('./user/register',{ error: null, user })
    }
    static create(req, res) {
        let user = null
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
                    res.redirect('/user/profile')
                }
                else {
                    res.render('./user/login', {err: "email/password salah", user: null})
                };
            })
            .catch(err=> {
                res.render('./user/login', {err})
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
                .then(user=>{
                    res.send(user);
                })
                .catch(err=>{
                    res.send(err)
                })
            }
        }
    }
}


module.exports = userController