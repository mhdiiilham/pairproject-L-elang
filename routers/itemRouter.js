'use strict'

const express = require('express');
const Router = express.Router();
const { item } = require('../controllers')

Router.get('/', item.findAll)
Router.get('/add', item.getItemForm)
Router.post('/add', item.createItem)

module.exports = Router