const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../../lib/mailer')

module.exports = {
    loginForm(req, res) {
        return res.render("session/login")
    },
    login(req, res) {
        req.session.userId = req.user.id

        return res.redirect("/users")
    },
    logout(req, res) {
        req.session.destroy();
        return res.redirect('/')
    },
    forgotForm(req, res) {
        return res.render("session/forgot-password")
    },
    async forgot(req, res) {
        try {
            const user = req.user
            const token = crypto.randomBytes(20).toString("hex")
    
            let now = new Date()
            now = now.setHours(now.getHours() + 1)
    
            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })
    
            await mailer.transport.sendMail({
                to: user.email,
                from: 'no-reply@example.com',
                subject: 'Recuperacao de senha',
                html: `<h2> Perdeu a chave? </h2>
                <p>Nao se preocupe, clique no link abaixo para recuperar sua senha</p>
                <p>
                    <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">Recuperar senha</a>
                </p>
                `
            })
            return res.render("session/forgot-password", {
                success: "Verifique seu email para resetar sua senha!"
            })
        } catch (err) {
            console.log(err)
            res.render("session/forgot-password", {
                error: "Error inesperado, tente novamente!"
            })
        }
    },
    resetForm(req, res) {
        res.render("session/password-reset", { token: req.query.token })
    },
    reset(req, res) {

        
    }
}