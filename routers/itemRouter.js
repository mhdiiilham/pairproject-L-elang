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

Router.get('/', item.findAll);
Router.post('/', item.searchFindOne);
Router.get('/add',  item.getItemForm);
Router.post('/add', upload.single('image'), item.createItem)
Router.get('/edit/:id',  item.editItem)
Router.post('/edit/:id',  item.updateItem)
Router.get('/show/:id', item.showItem)
Router.post('/show/:id', item.closedItem)

module.exports = Router