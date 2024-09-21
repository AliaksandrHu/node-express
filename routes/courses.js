const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
    const listCourses = await Course.find({}).exec()
    const courses = listCourses.map((el) => {
        return {
            id: el.id,
            title: el.title,
            price: el.price,
            img: el.img
        }
    })
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const listCourse = await Course.findById(req.params.id).exec()
    const course = {
        title: listCourse.title,
        price: listCourse.price,
        img: listCourse.img,
    }

    res.render('course', {
        layout: 'empty',
        title: `Курс ${course.title}`,
        course
    })
})
router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const listCourse = await Course.findById(req.params.id)
    console.log(listCourse)
    const course = {
        id: listCourse.id,
        title: listCourse.title,
        price: listCourse.price,
        img: listCourse.img,
    }
    res.render('course-edit', {
        title: `Редактировать ${course.title}`,
        course
    })

})

router.post('/edit', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
})

module.exports = router