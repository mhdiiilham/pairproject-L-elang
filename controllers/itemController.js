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
    res.render('items/addItem')
  }

  static createItem(req, res){
    Item.create({
      name: req.body.name,
      CategoryId: req.body.CategoryId,
      price: req.body.price,
      code: 'INI NANTI DI HOOKS',
      image: req.body.image
    })
    .then(success => {
      res.redirect('/item')
    })
    .catch(err => {
      console.log(err)
      res.send({err})
    })
    
  }
}

module.exports = itemController