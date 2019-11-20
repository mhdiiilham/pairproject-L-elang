'use strict'

const express = require('express');
const Router = express.Router();
const { body } = require('../controllers')


Router.get('/', body.list)
Router.post('/', body.coba)

module.exports = Router