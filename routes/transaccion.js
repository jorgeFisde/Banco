const router = require("express").Router()
const jwt = require('jsonwebtoken')


const baseDatos = require('../servicio/conexionBD')
const datosLogin = require('../routes/login')

router.post('/',datosLogin.verificscionToken,(req,res)=>{
     

    var sql = 'SELECT * FROM Transaccion WHERE (id_Cuenta_Remitente = ? OR id_Cuenta_Destinatario = ?)  and fecha between ? and ?'
    jwt.verify(req.token,'my_secret_key',(err,data)=>{
        baseDatos.query(sql,[req.body.numCuenta,req.body.otra,req.body.fecha1,req.body.fecha2],(err,result)=>{
            if (err) {
                console.log(err)
                res.send(err.sqlMessage)
    
            } else {
                console.log(result);
                
                res.json(
                    {
                        transaccion: result
                    }
                )
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