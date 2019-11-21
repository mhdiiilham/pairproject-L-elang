'use strict'

const express = require('express');
const Router = express.Router();
const Multer = require('multer')
const upload = Multer({
	storage: Multer.MemoryStorage
});

const { item } = require('../controllers')

Router.get('/', item.findAll);
Router.post('/', item.searchFindOne);
Router.get('/add', item.getItemForm);
Router.post('/add', upload.single('image'), item.createItem)
Router.get('/edit/:id', item.editItem)
Router.post('/edit/:id', item.updateItem)

module.exports = Router