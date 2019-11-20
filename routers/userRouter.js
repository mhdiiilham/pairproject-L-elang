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
Router.get('/profile', (req, res, next)=>{
    let Session = req.session.user
    if(!Session) {
        res.redirect('/login')
    }
    else {
        next()
    }
},user.profilePage);
Router.get('/isAdmin', (req, res, next)=>{
    let Session = req.session.user
    if(!Session) {
        res.redirect('/login')
    }
    else {
        next()
    }
}, user.isAdmin);
Router.post('/Admin', user.isAdminTrue);

Router.get('/bid/:id', (req, res, next) => {
    if(!session.user){
        res.redirect('/login')
    } else {
        next()
    }
}, user.bidPage)

module.exports = Router