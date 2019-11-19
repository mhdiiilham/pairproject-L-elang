'use strict'
const { User } = require('../models')

class userController {
    static register(req, res) {
        res.render('./user/register',{ error: null })
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
        res.render('./user/admin', {error: null})
    }
}

module.exports = userController