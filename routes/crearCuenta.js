const router = require('express').Router()
const jwt = require("jsonwebtoken")


const baseDatos = require('../servicio/conexionBD')
const datosLogin  = require('./login')

router.get("/",(req,res, next)=>{
    baseDatos.query("SELECT * FROM Cuenta",(err,rows)=>{
        if (err) {
            console.log(err);
            res.send("Hubo un error")
        }else{
            res.json(rows)
            console.log('ejecucion exitosa')
        }
    })
})

router.post('/',datosLogin.verificscionToken, (req, res) => {
    let emp = req.body
    const sql = "INSERT INTO Cuenta (id_Usuario,saldo,tipo)  values (?,?,?)"
    jwt.verify(req.token, 'my_secret_key',(err,data)=>{
        if (err) {
            res.sendStatus(403)
        }else{
            baseDatos.query(sql, [data.user.id,emp.saldo, emp.tipo], (err, result) => {

            if (err) {
                console.log(err)
                res.send('error')
    
            } else {
                res.send("Se ha creado tu cuenta!")
                console.log("se inserto en cuenta");
    
            }
        })
        }  
    })

})

module.exports = router