const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');

server.use(express.static("public"))

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    noCache: true,
    autoescape: false, // vai permitir imprimir html por meio de funcoes, objetos etc...
})

server.get('/', (req, res) => {
    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/83768101?v=4",
        name: "Joao Gabriel",
        role: "Estudante",
        description: 'Programador Junior de JavaScript, meu <a href="https://github.com/Azaph0x" target="_blank">Github</a>',
        links: [
            { name: "Twitter", url: "https://twitter.com/Azaphian/" },
            { name: "Github",url: "https://github.com/Azaph0x/" }
        ]
    }
    return res.render("about", { about })
})

server.get('/portfolio', (req, res) => {
    return res.render("portfolio", {items: videos})
})

server.get('/video', (req, res) => {
    const id = req.query.id;

    const video = videos.find((video) => {
       return video.id == id;
    })

    if(!video) {
        return res.send("video not found")
    }
    
    res.render("video", { item: video })
});

server.listen(8080, () => {
    console.log('server is running');
});