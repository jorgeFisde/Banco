const mysql = require("mysql");


const conexion = mysql.createConnection(
    {
        host: "18.218.255.127",
        user: "admin", 
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