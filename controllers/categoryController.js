'use strict'
const { Category, User } = require('../models')

class categoryController {
  static findAll(req, res){
    let sum
    User.sumUser()
      .then(data => {
        sum = data
        return Category.findAll()
      })
      .then(categories => {
        res.render('category/showAll', { data: categories, active: sum })
      })
      .catch(err => {
        res.send({ err })
      })

  }

  static getCategoryForm(req, res){
    let err = []
    User.sumUser()
      .then(data => {
        res.render('category/addCategory', { active: data, err })
      })
      .catch(err => {
        res.send({err: err.message})
      })
  }

  static createCategory(req, res){
    Category
      .create({
        name: req.body.name
      })
      .then(success => {
        res.redirect('/category')
      })
      .catch(error => {
        let err = [error.message]
        let sum
        User.sumUser()
          .then(data => {
            sum = data
            return Category.findAll()
          })
          .then(categories => {
            res.render('category/addCategory', { data: categories, active: sum, err })
          })
          .catch(err => {
            res.send({ err })
          })
      })
  }

  static chartSample(req, res){
    User.sumUser()
      .then(data => {
        res.render('category/chart', { active: data })
      })
  }

}

module.exports = categoryController