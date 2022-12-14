const instructor = require('../models/instructor')
const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = { 
            filter, 
            page, 
            limit, 
            offset, 
            callback(instructors) {
                const pagination = {
                    total: Math.ceil(instructors[0].total / limit),
                    page
                }
                return res.render('instructors/index', { instructors, filter, pagination })
            }
        }  

        instructor.paginate(params)
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send('Please, fill all fields')
        }
        instructor.create(req.body, (instructor) => {
            return res.redirect(`/instructors/${instructor.id}`)
        })
    },
    show(req, res) {
        instructor.find(req.params.id, (instructor) => {
            if(!instructor) return res.send('Instructor not found')

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
        
    },
    edit(req, res) {
        instructor.find(req.params.id, (instructor) => {
            if(!instructor) return res.send('Instructor not found')

            instructor.birth = date(instructor.birth).iso


            return res.render("instructors/edit", { instructor })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send('Please, fill all fields')
        }

        instructor.update(req.body, () => {
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req, res) {
        instructor.delete(req.body.id, () => {
            return res.redirect(`/instructors`)
        })
    },
}