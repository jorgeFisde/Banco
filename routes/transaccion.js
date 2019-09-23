const router = require("express").Router()
const jwt = require('jsonwebtoken')


const baseDatos = require('../servicio/conexionBD')
const datosLogin = require('../routes/login')

router.post('/',datosLogin.verificscionToken,(req,res)=>{
    var sql = 'SELECT * FROM Transaccion WHERE (id_Cuenta_Remitente OR id_Cuenta_Destinatario) = ?'
    jwt.verify(req.token,'my_secret_key',(err,data)=>{
        baseDatos.query(sql,[req.bodynumCuenta],(err,rows)=>{
            if (err) {
                console.log(err)
                res.send('error')
    
            } else {
                console.log(rows);
                
                res.json(rows)
            }
        })
    })
})
router.post('/crearTransaccion',datosLogin.verificscionToken,(req,res)=>{
    var sql = 'INSERT INTO Transaccion (id_Cuenta_Remitente,id_Cuenta_Destinatario,fecha,cantidad) VALUES (?,?,?,?)'
    var emp = req.body
    var now = new Date()
    jwt.verify(req.token,'my_secret_key',(err,data)=>{
        baseDatos.query(sql,[emp.idCuentaR,emp.idCuentaD,now,emp.cantidad],(err,result)=>{
            if (err) {
                console.log(err.sqlMessage)
  
                
                res.send('Error')
    
            } else {
                res.send("Exito!")
            }
        })
    })
})

module.exports = router