const mysql = require("mysql");


const conexion = mysql.createConnection(
    {
        host: "database-1.c4xpddivvqgu.us-east-2.rds.amazonaws.com",
        port: "3306",
        user: "admin", 
        password: "kokielfd",
        database: "Banco"
    }
)
conexion.connect((err)=>{
    if (err) {
        console.log("hubo un error al conectar con la base de datos");
        console.log(err);
        
        return
    }else {
        console.log("conexion establecida");
        
    }
})

module.exports = conexion