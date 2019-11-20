'use strict'
const { Item, Category } = require('../models')

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
      res.send({err})
    }) 
  }
  static showForUser(req, res) {}
}

module.exports = itemController