const User = require('../models/User')
const { compare } = require('bcryptjs')

async function login(req, res, next) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if(!user) return res.render('session/login', {
        user: req.body,
        error : "Usuario nao cadastado!"
    })

    const passed = await compare(password, user.password)
    if(!passed) return res.render("session/login", {
        user: req.body, 
        error: "Senha incorreta"
    })

    req.user = user
    next()
}

async function forgot(req, res, next) {
    const { email } = req.body
    
    try {
        let user = await User.findOne({ where: { email} })
        
        if(!user) return res.render('session/forgot-password', {
            user: req.body,
            error : "Email nao cadastado!"
        })

        req.user = user
        next()
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
     login, forgot
}