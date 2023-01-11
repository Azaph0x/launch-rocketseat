const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')
const session = require('./config/session')

const server = express()
const routes = require('./routes')

server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"))
server.use(methodOverride('_method'))
server.use(session)
server.use((req, res, next) => {
    res.locals.session = req.session
    next()
})
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
    express: server,
    noCache: true,
    autoescape: false, // vai permitir imprimir html por meio de funcoes, objetos etc...
})

server.listen(4000, () => {
    console.log('server is running')
});