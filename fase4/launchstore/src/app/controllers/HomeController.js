const {formatPrice, date} = require('../../lib/utils')

const Product = require('../models/Product')
const File = require('../models/File')

module.exports = {
    async index(req, res) {
        let results = await Product.all()
        const products = results.rows
        if(!products) return res.send('Products not found')

        async function getImage(productId){
            let results = await Product.files(productId)
            const files = results.rows.map(file =>`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`)
            let file = files[0]
            try {
                file = files[0].replace(/\\/g, '/')
            } catch {}
            return file
        }

        const productPromise = products.map(async product => {
            product.img = await getImage(product.id)
            product.price = formatPrice(product.price)
            product.old_price = formatPrice(product.old_price)
            return product
        }).filter((product, index) => index > 2 ? false : true)

        const lastAdded = await Promise.all(productPromise);

        return res.render("home/index", { products: lastAdded })
    }
}