const express = require('express')
const app = express()

const router = express.Router()
const categories = require('../fn/categories.js')

router.get('/categories',categories.all)
        .post('/categories',categories.create)

router.get('/categories/:id',categories.read)
        .put('/categories/:id',categories.update)
        .delete('/categories/:id',categories.delete)

        
module.exports = router