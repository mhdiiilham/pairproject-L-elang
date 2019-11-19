'use strict'
const express = require('express');
const Router = express.Router();
const { user } = require('../controllers')


Router.get('/', (req, res)=> {
    res.send('ini router')
});
Router.get('/admin', user.admin);
Router.post('/signup', user.create);
Router.post('/login', user.loginAttempt);
Router.get('/logout', user.logout);
Router.get('/profile', user.profilePage)

module.exports = Router