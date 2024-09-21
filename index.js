const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphb = require('express-handlebars')
const app = express()

const homeRoutes = require('./routes/home')
const courseRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const aboutRoutes = require('./routes/about')
const cardRoutes = require('./routes/card')

const hbs = exphb.create({
    defaultLayout:'main',
    extname:'hbs',

})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use('/',homeRoutes)
app.use('/courses',courseRoutes)
app.use('/add_course',addRoutes)
app.use('/about',aboutRoutes)
app.use('/card',cardRoutes)

const PORT = process.env.PORT || 3000

async function start(){
    try{
        const url = "mongodb://localhost:27017/shop"
        await mongoose.connect(url)
        app.listen(PORT, 'localhost',()=>{
            console.log(`Сервер запущен на порту ${PORT}...`)
        })
    } catch (e) {
        console.log(e)
    }

}

///////

start()

