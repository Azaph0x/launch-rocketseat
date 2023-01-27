const Cart = require('../../lib/cart')

const LoadProductService = require('../services/loadProductService')

module.exports = {
    async index(req, res) {  
        try {
            let { cart } = req.session

            cart = Cart.init(cart)

            return res.render('cart/index', { cart })
        } catch (err) {
            console.log(err)
        }
    },
    async addOne(req, res) {
        try {
            const { id } = req.params

            const product = await LoadProductService.load('product', { where: { id: 1}})
            if(!product) return res.redirect('/cart')

            let { cart } = req.session

            cart = Cart.init(cart).addOne(product)

            req.session.cart = cart

            return res.redirect('/cart')
        } catch (err) {
            console.log(err)
        }
    },
    async removeOne(req, res) {
        try {
            const { id } = req.params

            let { cart } = req.session
            if(!cart) return res.sredirect('/cart')

            cart = Cart.init(cart).removeOne(id)
            req.session.cart = cart

            return res.redirect('/cart')
        } catch (err) {
            console.log(err)
        }
    },
    async delete(req, res) {
        try {

            let { cart } = req.session
            let { id } = req.params
            if(!cart) return res.sredirect('/cart')

            req.session.cart  = Cart.init(cart).delete(id)

            return res.redirect('/cart')
        } catch (err) {
            console.log(err)
        }
    }
}