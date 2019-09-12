const router = require('express').Router()
const jwt = require("jsonwebtoken")


const baseDatos = require('../servicio/conexionBD')
const datosLogin = require('./login')

router.get("/", datosLogin.verificscionToken, (req, res, next) => {
    var sql = "SELECT * FROM Cuenta where id AND id_usuario = ?"
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        baseDatos.query(sql,[data.user.id], (err, rows) => {
            if (err) {
                console.log(err);
                res.send("Hubo un error")
            } else {
                res.json(rows)
                console.log('ejecucion exitosa')
            }
        })
    })
})
module.exports = router