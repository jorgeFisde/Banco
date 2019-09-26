const router = require("express").Router()
const hash = require('bcryptjs')

const baseDatos = require('../servicio/conexionBD')

// github studio 
router.get('/', (req, res, next) => {
    baseDatos.query("SELECT * FROM Usuario", (err, rows) => {

        if (err) {
            console.log(err)
            res.send('error')

        } else {
            res.json(rows)
        }
    })
})

router.post('/', (req, res) => {
    let emp = req.body
    const sql = "INSERT INTO Usuario (nombre,apellido,email,contraseña,fecha_Nacimiento)  values (?,?,?,?,?)"
    console.log();

    if (emp.contraseña = emp.ConfiContra) {
       // hash.hash(emp.contraseña, 10, (err, hash) => {
            baseDatos.query(sql, [emp.nombre, emp.apellido, emp.email, emp.contraseña, emp.fecha_Nacimiento], (err, result) => {

                if (err) {
                    console.log(err)
                    res.send(err.sqlMessage)

                } else {
                    res.send("todo correcto")
                    console.log("se inserto en la bd");

                }
            })
        //})

    } else {
        res.send("error")
    }

})

module.exports = router