const express = require('express')
const app = express()
app.use(express.json());
const port = 2000
var cors = require('cors')

//#region Mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:123@cluster-web-develop.9kt5ss3.mongodb.net/food');

const Product = mongoose.model('Product', {
  name: String,
  image: String,
  ingreS: [String],
  description: String
});
//#endregion
app.use(cors())
app.get('/', (req, res) => {
  res.send('¯\_(ツ)_/¯ Lesson 21 Server (Back-end)')
})
app.get('/api/product', async (req, res) => {
  let allProducts = await Product.find()
  res.json(allProducts)
})
app.post('/api/product', async (req, res) => {
  let product = req.body
  if (!product._id) product._id = new mongoose.Types.ObjectId()

  await Product.findByIdAndUpdate(product._id, product)
  res.json({ 'status': true })
})
app.listen(port, () => {
  console.log(`Lesson 22 http://localhost:${port}`)
})