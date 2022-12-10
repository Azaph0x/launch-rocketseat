const Member = require('../models/member')
const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {

        Member.all((members) => {
            return res.render('members/index', { members })
        })

    },
    create(req, res) {
        Member.instructorsSelectOption((options) => {
            return res.render('members/create', { instructorOptions: options })
        })
        
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send('Please, fill all fields')
        }
        Member.create(req.body, (member) => {
            return res.redirect(`/members/${member.id}`)
        })
    },
    show(req, res) {
        Member.find(req.params.id, (member) => {
            if(!member) return res.send('member not found')

            member.birth = date(member.birth).birthDay

            return res.render("members/show", { member })
        })
    },
    edit(req, res) {
        Member.find(req.params.id, (member) => {
            if(!member) return res.send('member not found')

            member.birth = date(member.birth).iso

            Member.instructorsSelectOption((options) => {
                return res.render('members/edit', { member, instructorOptions: options })
            })

        })
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send('Please, fill all fields')
        }

        Member.update(req.body, () => {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res) {
        Member.delete(req.body.id, () => {
            return res.redirect(`/members`)
        })
    },
}