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
    let session = req.session.user
    if(!session){
        res.redirect('/login')
    } else {
        next()
    }
}, user.bidPage);
Router.post('/bid/:id', user.bidPOST);
Router.post('/edit/:id', user.editUpdate);
Router.get('/edit/:id', user.editUpdate);
module.exports = Router