const express = require('express')
const router = express.Router()
const db = require('../config/database.js')

router.put('/idProduct/:id', (req, res) => {
    const id = req.params.id
    const newTitle = req.body.title
  
    const sql = `UPDATE products SET title = '${newTitle}' WHERE idProduct = ${id}`
  
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send('Product updated...')
    })
}) 
  
router.get('/selectProducts', (req, res) => {
    const sql = 'SELECT * FROM products'
   
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send({ message: 'Get products', result })
    })
}) 

router.get('/id/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM products WHERE idProduct = ${id}`
  
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send(result)
    })
}) 

router.get('/selectProductsDesc', (req, res) => {
    const sql = `SELECT * FROM products ORDER BY idProduct DESC;`
  
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send(result)
    })
}) 

router.get('/title/:title', (req, res) => {
    const title = req.params.title
    const sql = `SELECT * FROM products WHERE title = "${title}"`
  
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send(result)
    })
}) 

router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM products WHERE idProduct = ${req.params.id}`
  
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send('Product deleted')
    })
})

module.exports = router