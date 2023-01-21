const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')
const { unlinkSync } = require('fs')

const {formatPrice, date} = require('../../lib/utils')

module.exports = {
    async create(req, res) {
        try {
            const categories = await Category.findAll()
            return res.render('products/create', { categories })
        } catch (err) {
            console.error(err)
        }
    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body);

            for(key of keys) {
                if(req.body[key] == "") return res.send('Please, fill all fields')
            }
    
            if(req.files.lenght == 0) return res.send('Please, send at least one photo')
    
            let { category_id, name, description, 
                old_price, price, quantity, status } = req.body
            req.body.user_id = req.session.userId

            price = price.replace(/\D/g,"")

            const product_id = await Product.create({
                category_id,
                name,
                user_id: req.session.userId,
                description, 
                old_price: old_price || price,
                quantity,
                price,
                quantity,
                status: status || 1
            })

            
            const filesPromise = req.files.map(file => File.create({
                name: file.name,
                path: file.path,
                product_id 
            }))
            await Promise.all(filesPromise)
    
    
            return res.redirect(`/products/${product_id}/edit`)
        } catch (err) {
            console.error(err)
        }
    },
    async show(req, res) {
        const { id } = req.params
        const product = await Product.find(id)

        if(!product) return res.send('Product not found')

        const { day, hour, minutes, month } = date(product.updated_at)

        product.published = {
            day: `${day}/${month}`, 
            hour: `${hour}h${minutes}`, 
        }

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        let files = await Product.files(product.id)
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`, // o metodo de headers.host ele vem sem a / + com no banco tem o barra / dps do public e estamos dando replace isso se resolve
        }))

        return res.render('products/show', { product, files })
    },
    async edit(req, res) {
        try{
            const product = await Product.find(req.params.id)

            if(!product) return res.send("Product not found")

            product.price = formatPrice(product.price)
            product.old_price = formatPrice(product.old_price)

            //get Categories
            results = await Category.all()
            const categories = results.rows

            //get images
            let files = await Product.files(product.id)

            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`, // o metodo de headers.host ele vem sem a / + com no banco tem o barra / dps do public e estamos dando replace isso se resolve
            }))

            return res.render('products/edit', { product, categories, files })
        } catch (err) {
            console.error(err)
        }
    },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body);

            for(key of keys) {
                if(req.body[key] == "" && key != "removed_files") return res.send('Please, fill all fields')
            }
    
            req.body.price = req.body.price.replace(/\D/g, '')
    
            if(req.files.length != 0) {
                const newFilesPromise = req.files.map(file => 
                    File.create({...file, product_id: req.body.id}))
    
                await Promise.all(newFilesPromise)
            }
    
            if(req.body.removed_files) {
                const removedFiles = req.body.removed_files.split(',')
                const lastIndex = removedFiles.length - 1;
                removedFiles.splice(lastIndex, 1) 
    
                const removedFilesPromise = removedFiles.map(id => File.delete(id))
                await Promise.all(removedFilesPromise)
            }
    
            if(req.body.old_price != req.body.price) {
                const oldProduct = await Product.find(req.body.id)
                req.body.old_price = oldProduct.price
            }
    
            req.body.user_id = req.body.user_id
     
            await Product.update(req.body.id, {
                category_id: req.body.category_id,
                name: req.body.name,
                quantity: req.body.quantity,
                description: req.body.description,
                old_price: req.body.old_price,
                price: req.body.price,
                status: req.body.status,

            })
            
            return res.redirect(`products/${req.body.id}`)
        } catch (err) {
            console.error(err)
        }
      
    },
    async delete(req, res) {
        const files = await Product.files(req.body.id)
        await Product.delete(req.body.id)
        files.map(file => {
            try {
                unlinkSync(file.path)   
            } catch (error) {
                console.log(error)
            }
        })
z
        return res.redirect('/products/create')
    }
}