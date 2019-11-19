'use strict'
const { User } = require('../models')

class userController {
    static register(req, res) { // showing register page
        res.render('./user/register',{ error: null })
    }
    static create(req, res) {
        User.create(req.body)
            .then((user)=> {
                res.redirect('/home')
            })
            .catch(err=> {
                // res.send(err.errors[0].message)
                res.render('./user/register', { error: err.errors[0].message })
            });
    }
}

module.exports = userController