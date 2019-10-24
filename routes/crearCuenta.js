const router = require('express').Router()
const jwt = require("jsonwebtoken")


const baseDatos = require('../servicio/conexionBD')
const datosLogin  = require('./login')


router.post('/',datosLogin.verificscionToken, (req, res) => {
    let emp = req.body
    const sql = "CALL Crear_cuenta(?,?,?)"
    jwt.verify(req.token, 'my_secret_key',(err,data)=>{
        if (err) {
            res.sendStatus(403)
        }else{
            baseDatos.query(sql, [data.user.id,emp.saldo, emp.tipo], (err, result) => {

            if (err) {
                console.log(err)
                res.send(err.sqlMessage)
    
            } else {
                res.send("Se ha creado tu cuenta!")
                console.log("se inserto en cuenta");
    
            }
        })
        }  
    })

})

module.exports = router