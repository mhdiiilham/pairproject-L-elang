'use strict'
const express = require('express');
const Router = express.Router();
const { user } = require('../controllers')


Router.get('/', (req, res)=> {
    res.send('ini router')
});
Router.get('/admin', user.admin);
Router.post('/signup', user.create);

module.exports = Router