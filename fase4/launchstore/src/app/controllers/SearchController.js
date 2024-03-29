const Product = require('../models/Product')

const loadProductService = require('../services/loadProductService')

module.exports = {
    async index(req, res) { 
        try {
            let { filter, category } = req.query

            if (!filter) return res.redirect('/')

            let products = await Product.search({ filter, category})

            const productsPromise = products.map(loadProductService.format)

            products = await Promise.all(productsPromise)

            const search = {
                term: filter,
                total: products.length
            }

            const categories = products.map(product => ({
                id: product.category_id,
                name: product.category_name
            })).reduce((categoriesFiltered, category) => {
                // verificar se contem o objeto na array se nao tiver ele adicionar, caso nao tenha ele retorna a array apenas ja prenchida (metodologia para evitar o spam de category na nav html)
                const found = categoriesFiltered.some(cat => cat.id == category.id)
                
                if(!found) categoriesFiltered.push(category)

                return categoriesFiltered
            }, []) // [{id}] - reduzindo a array
    
            return res.render("search/index", { products, search, categories })
            
        } catch (err) {
            console.log(err)
        }

    },
}