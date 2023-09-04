import products, { find, length, push, findIndex, splice } from '../data.js'

const getProducts = ((req, res) => {
    res.json(products)
})

const getProduct = ((req, res) => {
    const id = Number(req.params.productID)
    const product = find(product => product.id === id)

        if (!product) {
        return res.status(404).send('Product not found')
    }
    res.json(product)
})

const createProduct = ((req, res) => {
    const newProduct = {
        id: length + 1,
        name: req.body.name,
        price: req.body.price
    }
    push(newProduct)
    res.status(201).json(newProduct)
})

const updateProduct = ((req, res) => {
    const id = Number(req.params.productID)
    const index = findIndex(product => product.id === id)
    const updatedProduct = {
        id: products[index].id,
        name: req.body.name,
        price: req.body.price
    }

    products[index] = updatedProduct
    res.status(200).json('Product updated')
})

const deleteProduct = ((req, res) => {
    const id = Number(req.params.productID)
    const index = findIndex(product => product.id === id)
    splice(index,1)
    res.status(200).json('Product deleted')
})

export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}