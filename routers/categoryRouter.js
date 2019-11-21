'use strict'

const express = require('express');
const Router = express.Router();
const { category } = require('../controllers')
const isAdmin = require('../middleware/isAdmin')
const isUser = require('../middleware/isUser')


Router.get('/', category.findAll)
Router.get('/chart', category.chartSample)
Router.get('/add', category.getCategoryForm)
Router.post('/add', category.createCategory)

module.exports = Router