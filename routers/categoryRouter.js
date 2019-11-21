'use strict'

const express = require('express');
const Router = express.Router();
const { category } = require('../controllers')
const isAdmin = require('../middleware/isAdmin')
const isUser = require('../middleware/isUser')


Router.get('/', isUser, isAdmin, category.findAll)
Router.get('/chart', isUser, isAdmin, category.chartSample)
Router.get('/add', isUser, isAdmin, category.getCategoryForm)
Router.post('/add', isUser, isAdmin, category.createCategory)

module.exports = Router