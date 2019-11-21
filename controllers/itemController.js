'use strict'
const { Item, Category, User } = require('../models')

class itemController {
  static findAll(req, res){
    let obj = req.query
    let dataItems
    let category
    let search = {}
    for (let a in obj){
      if(obj[a] !== '0'){
        if(a == 'category'){
          let insertId = obj[a].split(' ')
          search['CategoryId'] = Number(insertId[0])
        } else {
          search[a] = obj[a].toUpperCase()
        }
      }
    }
    let where = {where: search}

    Item
      .findAll(where)
      .then(items => {
        for(let i = 0; i < items.length; i++){
          items[i].image = new Buffer(items[i].image).toString('base64')
        }

        dataItems = items
        return Category.findAll()
      })
      .then(categories => {
        res.render('items/showAll', { data: dataItems, category: categories })
      })
      .catch(err => {
        console.log(err.message)
        res.send({ err })
      })
  }

  static searchFindOne(req, res){
    res.redirect(`/item?category=${req.body.name}&status=${req.body.status}`)
  }

  static getItemForm(req, res){
    Category
      .findAll()
      .then(categories => {
        res.render('items/addItem', {data: categories})
      })
      .catch(err => {
        res.send({err})
      })
  }

  static createItem(req, res){
    if(req.file == undefined){
      const err = {err: "Validation error: File cannot empty"}
      res.send(err)
    } else {
      Item.create({
        name: req.body.name,
        CategoryId: req.body.CategoryId,
        price: req.body.price,
        image: req.file.buffer,
        status: 'OPEN'
      })
      .then(success => {
        res.redirect('/item')
      })
      .catch(err => {
        res.send({err : err.message})
      }) 
    }
  }

  static editItem(req, res){
    let categoryData
    Category.findAll()
      .then(categories => {
        categoryData = categories
        return Item.findByPk(Number(req.params.id))
      })
      .then(item => {
        item.image = new Buffer(item.image).toString('base64')
        res.render('items/editItem', { data: item, category: categoryData})
      })
      .catch(err => {
        res.send({ err: err.message })
      })
  }

  static updateItem(req, res){
    let data = {}
    console.log(req.body)

    Item.findByPk(Number(req.params.id))
      .then(item => {
        data['CategoryId'] = item.CategoryId
        data['price'] = item.price
        if(req.body.CategoryId !== '0'){
          data.CategoryId = Number(req.body.CategoryId)
        }
        if(req.body.price !== ''){
          data.price = Number(req.body.price)
        }

        return Item.update(data, {where: {id: Number(req.params.id)}})
      })
      .then(success => {
        res.redirect('/item')
      })

  }
}

module.exports = itemController