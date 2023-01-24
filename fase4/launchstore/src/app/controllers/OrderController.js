const User = require('../models/User')
const loadProductService = require('../services/loadProductService')

const mailer = require('../../lib/mailer')

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
            // pegar os dados do produto
            const product = await loadProductService.load('product', {
                where: {
                    id: req.body.id
                }
            })
            // os dados do vendedor
            const seller = await User.findOne({ where : { id: product.user_id }})
            // os dados do comprador
            const buyer = await User.findOne({ where : { id: req.session.user_id }}) 
            // enviar email com dados da compra para o vendedor
            await mailer.transport.sendMail({
                to: seller.email,
                from: 'no-replay@launchstore.com.br',
                subject: 'Novo pedido de compra',
                html: email(seller, product, buyer)
            })

            return res.render('orders/sucess')
            // notificar o usuario com alguma messagem de sucesso
        } catch (err) {
            // ou erro
            console.log(err)
            return res.render('orders/error')
        }
    }
}