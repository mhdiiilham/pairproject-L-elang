'use strict'
const { User } = require('../models')
const bcrypt = require('../helpers/bcrypt')

class userController {
    static register(req, res) {
        let user = null
        res.render('./user/register',{ error: null, user })
    }
    static create(req, res) {
        User.create(req.body)
            .then((user)=> {
                res.redirect('/home')
            })
            .catch(err=> {
                res.render('./user/register', { error: err.errors[0].message })
            });
    }
    static admin(req, res) {
        let user = req.session.user
        res.render('./user/admin', {error: null, user})
    }
    static loginPage(req, res) {
        res.render('./user/login', {err:null})
    }
}


module.exports = userController