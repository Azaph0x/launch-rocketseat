async function post(req, res, next) {
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") return res.send('Por favor, volte e preencha todos os campos.')
    }

    if(!req.files || req.files.lenght == 0) return res.send('Por favor, envie pelos menos uma imagem.')


    next()
}

module.exports = {
    post
}