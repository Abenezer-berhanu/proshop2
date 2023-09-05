import express from 'express'
import dotenv from 'dotenv'
import products from './products.js'

dotenv.config()
const port = process.env.PORT || 5000
const app = express()
app.use(express.json())

app.get('/api/product', (req, res) => {
    res.json({ products })
})

app.get('/api/product/:id', (req, res) => {
    const {id} = req.params
    const product = products.find(p => p._id === id)
    res.json({ product })
})

app.listen(port, () => {
    console.log(`server listning to port ${port}`)
})