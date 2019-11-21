'use strict'

const express = require('express');
const Router = express.Router();
const Multer = require('multer')
const upload = Multer({
	storage: Multer.MemoryStorage
});
const isAdmin = require('../middleware/isAdmin')
const isUser = require('../middleware/isUser')

const { item } = require('../controllers')

Router.get('/', isUser, isAdmin, item.findAll);
Router.post('/', isUser, isAdmin, item.searchFindOne);
Router.get('/add', isUser, isAdmin, item.getItemForm);
Router.post('/add', isUser, isAdmin, upload.single('image'), item.createItem)
Router.get('/edit/:id', isUser, isAdmin, item.editItem)
Router.post('/edit/:id', isUser, isAdmin, item.updateItem)
Router.get('/show/:id', isUser, isAdmin, item.showItem)
Router.post('/show/:id', isUser, isAdmin, item.closedItem)

module.exports = Router