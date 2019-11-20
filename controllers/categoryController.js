'use strict'
const { Category } = require('../models')

class categoryController {
  static findAll(req, res){
    Category
      .findAll()
      .then(categories => {
        // res.send(categories)
        res.render('category/showAll', { data: categories })
      })
      .catch(err => {
        res.send({ err })
      })

  }

  static getCategoryForm(req, res){
    res.render('category/addCategory')
  }

  static createCategory(req, res){
    Category
      .create({
        name: req.body.name
      })
      .then(success => {
        res.redirect('/category')
      })
      .catch(err => {
        res.send({err})
      })
  }

}

module.exports = categoryController