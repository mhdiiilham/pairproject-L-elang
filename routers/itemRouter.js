'use strict'

const express = require('express');
const Router = express.Router();
const Multer = require('multer')
const upload = Multer({
	storage: Multer.MemoryStorage
});

const { item } = require('../controllers')

Router.get('/', (req, res, next)=>{
	let userSession = req.session.user
	if(!userSession) {
		res.redirect('/list')
	} else {
		if(userSession.role !== 'admin') {
			res.redirect('/list')
		} else {
			next()
		}
	}
}, item.findAll);
Router.post('/', item.searchFindOne);
Router.get('/add', item.getItemForm);
Router.post('/add', upload.single('image'), item.createItem)
Router.get('/edit/:id', item.editItem)
Router.post('/edit/:id', item.updateItem)

module.exports = Router