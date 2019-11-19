'use strict'
const express = require('express');
const Router = express.Router();
const { user } = require('../controllers')


Router.get('/', (req, res)=> {
    res.send('ini router')
});
Router.get('/admin', user.admin);
// Router.get('/login', user.loginPage);
// Router.post('/login', user.loginPOST);
Router.get('/signup', user.register);
Router.post('/signup', user.create);

module.exports = Router