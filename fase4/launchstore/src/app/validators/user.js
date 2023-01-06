const User = require('../models/User')

async function post(req, res, next) {
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") return res.render('user/register', {
            error: 'Por favor, preencha todos os campos.', user: req.body
        })
    }

    // check if user exists [email, cpf_cnpj]
    let { email, cpf_cnpj, password, passwordRepeat } = req.body
    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({
        where: { email}, 
        or: { cpf_cnpj}
    })

    if(user) return res.render('user/register', {
        error: 'Usuario ja cadastrado', user: req.body
    })

    // check password match
    if(password != passwordRepeat) return res.render('user/register', {
        error: 'As senhas nao sao iguais', user: req.body
    })

    next()
}

module.exports = {
    post
}