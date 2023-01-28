const User = require('../models/User')
const Order = require('../models/Order')
const loadProductService = require('../services/loadProductService')
const LoadOrderService = require('../services/LoadOrderService')

const mailer = require('../../lib/mailer')
const Cart = require('../../lib/cart')

const email = (seller, product, buyer) => `
<h2>Ola, ${seller.name}</h2>
<p> Voce tem um novo pedido de compra do seu produto</p>
<p>Produto: ${product.name}</p>
<p>Preco: ${product.formattedPrice}</p>
<p><br/><br/></p>
<h3>Dados do comprador</h3>
<p>${buyer.name}</p>
<p>${buyer.email}</p>
<p>${buyer.address}</p>
<p>${buyer.cep}</p>
<p><br/><br /></p>
<p><strong>Entre em contato com o comprador para finalizar a venda!</strong></p>
<p><br/><br /></p>
<p>Att, LaunchStore</p>
`

module.exports = {
    async post(req, res) {  
        try {

            // pegar os produtos do carrinho
            const cart = Cart.init(req.session.cart)

            // verificar se
            const buyer_id = req.session.userId

            // removendo se o vendedor for o mesmo que o comprador e criando as ordems de pedidos

            const createOrdersPromise = cart.items.filter(item => item.product.user_id != buyer_id).map(async item => {
                let { product, price:total , quantity } = item
                const { price, id: product_id, user_id: seller_id } = product
                const status = "open"

                const order = await Order.create({
                    seller_id,
                    buyer_id,
                    product_id,
                    price,
                    total,
                    quantity,
                    status

                })

                
            // pegar os dados do produto
            product = await loadProductService.load('product', {
                where: {
                    id: product_id
                }
            })
            // os dados do vendedor
            const seller = await User.findOne({ where : { id: seller_id }})
            // os dados do comprador
            const buyer = await User.findOne({ where : { id:  buyer_id }}) 
            // enviar email com dados da compra para o vendedor
            await mailer.transport.sendMail({
                to: seller.email,
                from: 'no-replay@launchstore.com.br',
                subject: 'Novo pedido de compra',
                html: email(seller, product, buyer)
            })

            return order
            })

            await Promise.all(createOrdersPromise)

            delete req.session.cart

            return res.render('orders/success')
            // notificar o usuario com alguma messagem de sucesso
        } catch (err) {
            // ou erro
            console.log(err)
            return res.render('orders/error')
        }
    },
    async index(req, res) {
        const orders = await LoadOrderService.load('orders', { where: {buyer_id: req.session.userId}})

        return res.render('orders/index', { orders })
    },
    async show(req, res) {
        const order = await LoadOrderService.load('order', { where: { id: req.params.id}})
    
        return res.render('orders/details', { order })
    },
    async sales(req, res) {
        const sales = await LoadOrderService.load('orders', { where: {seller_id: req.session.userId}})

        return res.render('orders/sales', { sales })
    },
    async update(req, res) {
        try {
            const { id, action } = req.params

            const acceptedActions = ['close', 'cancel']
            if(!acceptedActions.includes(action)) return res.send("Can't do this action")

            // pegar o pedido
            const order = await Order.findOne({ where: { id }})
            if(!order) return res.send("Order not found")

            //verificar se ele esta aberto
            if(order.status != 'open') return res.send("Can't do this action")
            const statuses = {
                close: "sold",
                cancel: "canceled"
            }

            order.status = statuses[action]

            // atualizar o pedido
            await Order.update(id, { status : order.status})
            
            return res.redirect('/orders/sales')
        } catch (err) {
            console.error(err)
        }
    }
}