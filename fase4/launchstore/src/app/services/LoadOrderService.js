const Order = require('../models/Order')
const User = require('../models/User')

const loadProductService = require('./loadProductService')

const { date, formatPrice } = require('../../lib/utils')


async function format(order) {
    order.product = await loadProductService.load('productWithDeleted', {
        where: { id: order.product_id }
    })
    // detalhes do comprador
    order.buyer = await User.findOne({ where: {
        id: order.buyer_id
    }})

    // detalhes do vendedor
    order.seller = await User.findOne({ where: {
        id: order.seller_id
    }})
    // formatacao de preco
    order.formattedPrice = formatPrice(order.price)
    order.formattedTotal = formatPrice(order.total)

    // formatacao do status
    const statuses = {
        open: 'Aberto',
        sold: 'Vendido',
        canceld: 'Cancelado'
    }
    order.formattedStatus = statuses[order.status] // statuses.open

    // formatacao do atualizado em...
    const updatedAt = date(order.updated_at)
    order.formattedUpdatedAt = `${order.formattedStatus} em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} as ${updatedAt.hour}h${updatedAt.minutes}`
    return order
}

const loadService = {
    load(service, filter) {
        this.filter = filter;
        return this[service]()
    },
    async order() {
        try {
            const order = await Order.findOne(this.filter)
        
            return format(order)
        } catch (err) {
            console.error(err)
        }
    },
    async orders() {
        try {
            const orders = await Order.findAll(this.filter)
            const ordersPromise = orders.map(format)
            
            return Promise.all(ordersPromise)
        } catch (err) {
            console.error(err)
        }
    },
    format
}

module.exports = loadService