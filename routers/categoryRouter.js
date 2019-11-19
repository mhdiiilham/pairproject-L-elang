'use strict'

const express = require('express');
const Router = express.Router();
const { category } = require('../controllers')


Router.get('/', category.findAll)
Router.get('/add', category.getCategoryForm)
Router.post('/add', category.createCategory)

module.exports = Router