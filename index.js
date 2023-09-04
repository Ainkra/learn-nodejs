import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import products from './data.js'

const app = express()
const port =  3000

app.get('/', (req, res) => {
    res.send("Bonjour !")
})

// Faire un middleware
/* Un middleware permet d'exécuter quelque chose avant la requête.
Par exemple on souhaite reçevoir un log avant qu'une requête get soit exécutée on fera
cela. On notera la fonction next qui permet de dire de continuer
une fois que la fonction est exécutée.*/
const logger = (req, res, next) => {
    console.log(req.url)
    console.log(req.params)
    console.log(req.query)
    next()
}

// Puis, dans une requête on pourra ajouter la fonction d'exécution
// avant que la requête soit envoyée.
app.get('/about', logger, (req, res) => {
    return res.send('About Page')
})

app.get('/api/products/:productID', (req, res) => { // :productID consiste au paramètre du produit.
    const id = Number(req.params.productID) // On va le redéfinir ici.
    const product = products.find(product => product.id === id)

        if (!product) {
        return res.status(404).send('Product not found')
    }
    res.json(product)
})



app.listen(port, () => console.log(`Notre application node est démarrée: http://localhost:${port}`))