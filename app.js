const express = require('express')
const app = express()

const mysql = require('mysql')

const myConnection = require('express-myconnection')

const methodOverride = require('method-override')

const config = require('./config')
const dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
}

app.use(myConnection(mysql,dbOptions,'pool'))

//set view engine
app.set('view engine','pug')
app.set('views','./views')

//Static libs
app.use(express.static('./public'))

//Middleware reads form inputs
var bodyParser = require('body-parser')
//Parses the text as URL encoded data 
app.use(bodyParser.urlencoded({extended:true}))
//Exposes the resulting object (containing the keys and values) on req.body
app.use(bodyParser.json())


//initialize routes
app.use(require('./routes/index'))
app.use('/api',require('./routes/categories'))


//Use HTTP verbs such as PUT or DELETE which are not supported
app.use(methodOverride((req,res)=>{
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

module.exports = app