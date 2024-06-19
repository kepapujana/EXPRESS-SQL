const express = require('express')
const router = express.Router()
const db = require('../config/database.js')

router.post('/insertCategory', (req, res) => {
    const sql = `INSERT INTO categories (title)
    values ('${req.body.title}');`
   
    db.query(sql, (err, result) => {
      if (err) throw err
      console.log(result)
      res.send('Category added...')
    })
})

router.put('/idCategory/:id', (req, res) => {
    const id = req.params.id
    const newTitle = req.body.title
  
    const sql = `UPDATE categories SET title = '${newTitle}' WHERE idCategory = ${id}`
  
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send('Category updated...')
    })
})

router.get('/selectCategories', (req, res) => {
    const sql = 'SELECT * FROM categories'
   
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send({ message: 'Get categories', result })
    })
})

router.get('/selectProductsCategories', (req, res) => {
    const sql = 'SELECT categories.title AS category, products.title AS product FROM categories INNER JOIN products ON categories.idCategory = products.idProduct'
   
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send({ message: 'Get categories & products', result })
    })
})

router.get('/id/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM categories WHERE idCategory = ${id}`
  
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send(result)
    })
})

module.exports = router