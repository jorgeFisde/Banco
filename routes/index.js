const router = require("express").Router()
const jwt = require("jsonwebtoken")


const baseDatos = require('../servicio/conexionBD')
const datosLogin  = require('./login')

router.get('/',datosLogin.verificscionToken, (req, res) => {
    var sql = "SELECT * FROM Cuenta,cuentas_frecuentes WHERE Cuenta.id_usuario = ? AND cuentas_frecuentes.id_usuario = ?"
    jwt.verify(req.token, 'my_secret_key',(err,data)=>{
        var myId = data.user.id

        if (err) {
            res.sendStatus(403)
        }else{
           
            baseDatos.query(sql,[myId,myId], (err, rows) => {
                data.user.cuenta = rows
                if (err) {
                    console.log(err)
                    res.send('error')
        
                } else {
                    res.json(data.user)
                }
            })       
         }

    })
})

module.exports = router