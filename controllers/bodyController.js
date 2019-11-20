'use strict'
const { Category, Item } = require('../models')

class bodyController {
  static list(req, res){
    Item
      .findAll({include: [ Category ]})
      .then(data => {
        for(let i = 0; i < data.length; i++){
          data[i].image = new Buffer(data[i].image).toString('base64')
        }
        Category.findAll()
        .then(categories=> {
          res.render('hompage/list', { data, user: req.session.user, list: categories })
        })
      })
  }

  static coba(req, res){
    res.send(req.body)
  }
}

module.exports = bodyController