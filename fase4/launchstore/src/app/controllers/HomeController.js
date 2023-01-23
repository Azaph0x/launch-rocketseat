const {formatPrice} = require('../../lib/utils')

const loadProductService = require('../services/loadProductService')

const Product = require('../models/Product')
const File = require('../models/File')

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