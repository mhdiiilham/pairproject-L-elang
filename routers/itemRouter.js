'use strict'

const express = require('express');
const Router = express.Router();
const { item } = require('../controllers')

Router.get('/', item.findAll)

module.exports = Router