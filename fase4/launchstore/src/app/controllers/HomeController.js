const loadProductService = require('../services/loadProductService')

module.exports = {
    async index(req, res) {  
        try {
            const allProducts = await loadProductService.load('products')
            const products = allProducts.filter((product, index) => index > 2 ? false : true) 
            // show 3 products in home page

            return res.render("home/index", { products })   
        } catch (err) {
            console.log(err)
        }
    }
}