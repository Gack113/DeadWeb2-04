exports.all = (req,res,next)=>{
    var startNum = parseInt(req.query.start)
    var limitNum = parseInt(req.query.limit)
    req.getConnection((err,con)=>{
        con.query('SELECT * FROM ?? ORDER BY CatID ASC LIMIT ? OFFSET ?',['categories',limitNum,startNum],(err,rows,fields)=>{
            return new Promise((resolve,reject)=>{
                if(err)
                    return reject(err)
                resolve(rows)
            }).then((rows)=>res.json(rows)).catch(err => console.log('Lỗi: ' + err))
        })
    })
}

exports.read = (req,res,next)=>{
    req.getConnection((err,con)=>{ 
        con.query('SELECT * FROM categories WHERE CatID = ?',[req.params.id],(err,row,fields)=>{
            return new Promise((resolve,reject)=>{
                if(err)
                    return reject(err)
                resolve(row)
            }).then((row)=>res.json(row)).catch(err => console.log('Lỗi: ' + err))
        })
    })
}

exports.create = (req,res,next)=>{
    req.getConnection((err,con)=>{     
        var data = {
            CatName: req.body.name
        }
        con.query('INSERT INTO categories SET ?',data,(err,rows,fields)=>{
            return new Promise((resolve,reject)=>{
                if(err)
                    return reject(err)
                resolve(rows)
            }).then((rows)=>res.json(rows)).catch(err => console.log('Lỗi: ' + err))
        })
    })
}

exports.update = (req,res,next)=>{
    req.getConnection((err,con)=>{  
        var data = {
            CatName: req.body.name
        }   
        con.query('UPDATE categories SET ? WHERE CatID = ?',[data,req.params.id],(err,rows,fields)=>{
            return new Promise((resolve,reject)=>{
                if(err)
                    return reject(err)
                resolve(rows)
            }).then((rows)=>res.json(rows)).catch(err => console.log('Lỗi: ' + err))
        })
    })
}

exports.delete = (req,res,next)=>{
    req.getConnection((err,con)=>{     
        con.query('DELETE FROM categories WHERE CatID = ?',[req.params.id],(err,rows,fields)=>{
            return new Promise((resolve,reject)=>{
                if(err)
                    return reject(err)
                resolve(rows)
            }).then((rows)=>res.json(rows)).catch(err => console.log('Lỗi: ' + err))
        })
    })
}


