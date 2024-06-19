const express = require("express")
const app = express()
const PORT = 3000
const db = require('./config/database.js')


app.use(express.json())
app.use('/categories', require('./routes/categories.js'))
app.use('/products', require('./routes/products.js'))

// app.get('/createdb', (req, res) => {
//     const sql = 'CREATE DATABASE endpoint'
   
//     db.query(sql, (err, result) => {
//       if (err) throw err
//       console.log(result)
//       res.send('Database created...')
//     })
// })

// app.get('/createTableProducts', (req, res) => {
//   const sql =
//     'CREATE TABLE products (id int AUTO_INCREMENT, title VARCHAR(255), PRIMARY KEY(id))'
//   db.query(sql, (err, result) => {
//     if (err) throw err
//     console.log(result)
//     res.send('Products table created...')
//   })
// })

// app.get('/createTableCategories', (req, res) => {
//   const sql =
//     'CREATE TABLE categories (id int AUTO_INCREMENT, title VARCHAR(255), PRIMARY KEY(id))'
//   db.query(sql, (err, result) => {
//     if (err) throw err
//     console.log(result)
//     res.send('categories table created...')
//   })
// })

// app.post('/', (req, res) => {
//   const sql = `INSERT INTO products (title)
//   values ('${req.body.title}');`
 
//   db.query(sql, (err, result) => {
//     if (err) throw err
//     console.log(result)
//     res.send('Product added...')
//   })
// }) 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))