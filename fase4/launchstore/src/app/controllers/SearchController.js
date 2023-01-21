const Product = require('../models/Product')

const {formatPrice} = require('../../lib/utils')

module.exports = {
    async index(req, res) {
        try {
            let results, params = {}

            const { filter, category } = req.query

            if (!filter) return res.redirect("/")

            params.filter = filter

            if(category) {
                params.category = category
            } 
            
            let products = await Product.search(params)

            async function getImage(productId){
                let files = await Product.files(productId)
                files = files.map(file =>`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
                let file = files[0]
                try {
                    file = files[0].replace(/\\/g, '/')
                } catch {}
                return file
            }

            const productsPromise = products.map(async product => {
                product.img = await getImage(product.id)
                product.price = formatPrice(product.price)
                product.old_price = formatPrice(product.old_price)
                return product
            })

            products = await Promise.all(productsPromise)

            const search = {
                term: req.query.filter,
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