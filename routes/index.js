const router = require("express").Router()
const jwt = require("jsonwebtoken")


const baseDatos = require('../servicio/conexionBD')
const datosLogin  = require('./login')

router.get('/',datosLogin.verificscionToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key',(err,data)=>{

        if (err) {
            res.sendStatus(403)
        }else{
           
            baseDatos.query("SELECT * FROM Cuenta WHERE id_usuario = ? ",[data.user.id], (err, rows) => {
                data.user.cuenta = rows[{}]
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