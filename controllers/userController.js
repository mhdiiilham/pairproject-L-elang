'use strict'
const { User } = require('../models')

class userController {
    static register(req, res) { // showing register page
        res.render('./user/register')
    }
    static create(req, res) {
        User.create(req.body)
            .then((user)=> {
                res.send(user)
            })
            .catch(err=> {
                res.send(err);
            });
    }
}

module.exports = userController