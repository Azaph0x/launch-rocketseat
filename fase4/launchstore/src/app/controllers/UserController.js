const { hash } = require('bcryptjs')
const { unlinkSync } = require('fs')

const User = require('../models/User')
const Product = require('../models/Product')


const { formatCep, formatCpfCnpj } = require('../../lib/utils')

module.exports = {
    registerForm(req, res) {

        return res.render('user/register')
    },
    async show(req, res) {
        try {
            const user = req.user
            user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
            user.cep = formatCep(user.cep)
     
            return res.render('user/index', { user })
        } catch (error) {
            console.log(error)
        }
       
    },
    async post(req, res) {
        try {
            let { name, email, password, cpf_cnpj, cep, address } = req.body
            
            cpf_cnpj = cpf_cnpj.replace(/\D/g,"")
            cep = cep.replace(/\D/g,"")

            password = await hash(password, 8)

            const userId = await User.create({
                name,
                email,
                password,
                cpf_cnpj,
                cep,
                address
            })

            req.session.userId = userId

            return res.redirect('/users')
        } catch (error) {
            console.log(error)
        }
    },
    async update(req, res) {
        try {
            const user = req.user
            let { name, email, cpf_cnpj, cep, address } = req.body
            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            await User.update(user.id, {
                name, email, cpf_cnpj, cep, address
            })

            return res.render('user/index', {
                user: req.body,
                success: "Conta atualizada com sucesso"
            })
        } catch (error) {
            console.log(error)
            return res.render('user/index', { error: "Algum erro aconteceu!"})
        }
    },
    async delete( req, res) {
        try {
            const products = await Product.findAll({ where: {
                user_id: req.body.id
            }})

            const allFilesPromise = products.map(product => Product.files(product.id))
            let promiseResults = await Promise.all(allFilesPromise)

            await User.delete(req.body.id)
            req.session.destroy()

            promiseResults.map(files => {
                try {
                    files.map(file => unlinkSync(file.path))
                } catch (err) {
                    console.log(err)
                }
            })

            return res.render("session/login", {
                success: "Conta deletada com sucesso!"
            })
        } catch (err) {
            console.log(err)
            return res.render("user/index", {
                user: req.body,
                error: "Error ao tentar deletar sua conta!"
            })
        }
    }
}
