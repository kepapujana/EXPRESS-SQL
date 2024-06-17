const express = require("express")
const app = express()
const PORT = 3000
const mysql = require('mysql2')

app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kplosabcd123',
  database: 'endpoint',
})

db.connect()

module.exports = db

app.get('/createdb', (req, res) => {
    const sql = 'CREATE DATABASE endpoint'
   
    db.query(sql, (err, result) => {
      if (err) throw err
      console.log(result)
      res.send('Database created...')
    })
})

app.get('/createTableProducts', (req, res) => {
  const sql =
    'CREATE TABLE products (id int AUTO_INCREMENT, title VARCHAR(255), PRIMARY KEY(id))'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Products table created...')
  })
})

app.get('/createTableCategories', (req, res) => {
  const sql =
    'CREATE TABLE categories (id int AUTO_INCREMENT, title VARCHAR(255), PRIMARY KEY(id))'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('categories table created...')
  })
})

app.post('/', (req, res) => {
  const sql = `INSERT INTO products (title)
  values ('${req.body.title}');`
 
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Product added...')
  })
}) 

app.post('/insertCategory', (req, res) => {
  const sql = `INSERT INTO categories (title)
  values ('${req.body.title}');`
 
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Category added...')
  })
})

app.put('/products/idProduct/:id', (req, res) => {
  const id = req.params.id
  const newTitle = req.body.title

  const sql = `UPDATE products SET title = '${newTitle}' WHERE idProduct = ${id}`

  db.query(sql, (err, result) => {
    if (err) throw err
    res.send('Product updated...')
  })
}) 

app.put('/categories/idCategory/:id', (req, res) => {
  const id = req.params.id
  const newTitle = req.body.title

  const sql = `UPDATE categories SET title = '${newTitle}' WHERE idCategory = ${id}`

  db.query(sql, (err, result) => {
    if (err) throw err
    res.send('Category updated...')
  })
})

app.get('/selectProducts', (req, res) => {
  const sql = 'SELECT * FROM products'
 
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send({ message: 'Get products', result })
  })
}) 

app.get('/selectCategories', (req, res) => {
  const sql = 'SELECT * FROM categories'
 
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send({ message: 'Get categories', result })
  })
}) 

app.get('/selectProductsCategories', (req, res) => {
  const sql = 'SELECT categories.title AS category, products.title AS product FROM categories INNER JOIN products ON categories.idCategory = products.idProduct'
 
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send({ message: 'Get categories & products', result })
  })
})

app.get('/products/id/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM products WHERE idProduct = ${id}`

  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
}) 

app.get('/selectProductsDesc', (req, res) => {
  const sql = `SELECT * FROM products ORDER BY idProduct DESC;`

  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
}) 

app.get('/categories/id/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM categories WHERE idCategory = ${id}`

  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
}) 

app.get('/products/title/:title', (req, res) => {
  const title = req.params.title
  const sql = `SELECT * FROM products WHERE title = "${title}"`

  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
}) 

app.delete('/products/:id', (req, res) => {
  const sql = `DELETE FROM products WHERE idProduct = ${req.params.id}`

  db.query(sql, (err, result) => {
    if (err) throw err
    res.send('Product deleted')
  })
})
 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))