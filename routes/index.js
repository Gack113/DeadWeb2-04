const express = require('express')
const app = express()

const categories = require('../fn/categories.js')

const router = express.Router()

router.get('/',(req,res,next)=>{
    var totalRecord = 0
    var startNum = 0
    var limitNum = 5
    req.getConnection((err,con)=>{
        con.query('SELECT COUNT(*) AS TotalCount from ??','categories',(err,rows,fields)=>{
            return new Promise((resolve,reject)=>{
                if(err)
                    return reject(err)
                resolve(rows)
            }).then((rows)=> totalRecord = rows[0].TotalCount).catch(err => console.log('Lỗi: ' + err))
        })
        con.query('SELECT * FROM ?? ORDER BY CatID ASC LIMIT ? OFFSET ?',['categories',limitNum,startNum],(err,rows,fields)=>{
            return new Promise((resolve,reject)=>{
                if(err)
                    return reject(err)
                resolve(rows)
            }).then((rows)=>{
                var paginate = {
                    totalRecord,
                    pages: parseInt(totalRecord/limitNum) + 1,
                    currentPage: (startNum + limitNum) / limitNum,
                    start: startNum + 1,
                    end: startNum + limitNum
                }
                res.render('page/home',{paginate,categories:rows})
            }).catch(err => console.log('Lỗi: ' + err))
        })
    })
})

module.exports = router