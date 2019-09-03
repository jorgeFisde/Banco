const router = require("express").Router()
const jwt = require('jsonwebtoken')


const baseDatos = require('../servicio/conexionBD')
const datosLogin = require('../routes/login')

router.get('/',datosLogin.verificscionToken,(req,res)=>{
    var sql = 'SELECT * FROM Cuenta,Transaccion WHERE cuenta.id_usuario = ? AND transaccion.id_cuenta_remitente = ?'
    jwt.verify(req.token,'my_secret_key',(err,data)=>{
        baseDatos.query(sql,[data.user.id,req.body.numCuenta],(err,rows)=>{
            if (err) {
                console.log('hubo un error al consultar transacciones')
                res.send('error')
    
            } else {
                res.json(rows)
            }
        })
    })
})
router.post('/crearTransaccion/',datosLogin.verificscionToken,(req,res)=>{
    var sql = 'INSERT INTO Transaccion (id_Cuenta_Remitente,id_Cuenta_Destinatario,fecha,cantidad) VALUES (?,?,?,?)'
    var emp = req.body
    var now = new Date()
    jwt.verify(req.token,'my_secret_key',(err,data)=>{
        baseDatos.query(sql,[emp.idCuentaR,emp.idCuentaD,now,emp.cantidad],(err,result)=>{
            if (err) {
                console.log('hubo un error al crear transaccion')
                console.log(err);
                
                res.send('error')
    
            } else {
                res.json(result)
            }
        })
    })
})

module.exports = router