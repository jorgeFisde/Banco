const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()

const baseDatos = require('../servicio/conexionBD')

var user = {}
app.get('/', (req, res) => {
    res.send("Inicio de sesion")
})

app.post('/', (req, res) => {
    let emp = req.body
    var email = emp.email
    var contraseña = emp.contraseña
    const sql = "SELECT id,nombre,apellido,email,fecha_Nacimiento FROM usuario WHERE email = ? AND contraseña = sha1(?)"
    if (email && contraseña) {

            baseDatos.query(sql, [email, contraseña], (err, results) => {
                if (results.length > 0) {
                    user = results[0]
                    const token = jwt.sign({ user }, 'my_secret_key',{expiresIn: '1h'})
                    res.json(token)
                    console.log(token);
    
                } else {
                    res.send('Email o contraseña incorrecta')    
                    console.log('Email o contraseña incorrecta!');
    
                }
            })
        
    } else {
        res.send('Por favor inserta un email y un correo')
        res.end()
    }

})

function verificscionToken(req, res, next) {
    // cabexaera del portador que se envia al verificar token
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader);
    if (bearerHeader != undefined) {
        //separa en arreglos el string 
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }

}

module.exports = {
    app,
    verificscionToken
}