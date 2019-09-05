const mysql = require("mysql");


const conexion = mysql.createConnection(
    {
        host: "ubuntu@3.14.72.155",
        user: "admint", 
        password: "kokielfd",
        database: "banco",
        multipleStatements : true
    }
)
conexion.connect((err)=>{
    if (err) {
        console.log("hubo un error al conectar con la base de datos");
        return
    }else {
        console.log("conexion establecida");
        
    }
})

module.exports = conexion