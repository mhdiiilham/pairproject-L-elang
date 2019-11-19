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

  static getItemForm(req, res){
    Item.create({
      name: req.body.name,
      CategoryId: req.body.CategoryId,
      price: req.body.price,
      code: 'INI NANTI DI HOOKS',
      image: req.body.image
    })
    .then(success => {
      res.redirec('/item')
    })
    .catch(err => {
      res.send({err})
    })
  }

  static createItem(req, res){
    res.send(req.body)
  }
}

module.exports = itemController