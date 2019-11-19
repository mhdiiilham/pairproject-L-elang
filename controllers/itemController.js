'use strict'
const { Item } = require('../models')

class itemController {
  static findAll(req, res){
    Item
      .findAll()
      .then(items => {
        // res.send(items)
        res.render('items/showAll', { data: items })
      })
      .catch(err => {
        res.send({ err })
      })
  }
}

module.exports = itemController