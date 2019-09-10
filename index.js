const express = require("express")

const app = express()

app.set('port', process.env.PORT || 3000)

const Register = require('./routes/register');
const getCuenta = require('./routes/crearCuenta')
const login = require('./routes/login')
const home = require("./routes/index")
const transac = require('./routes/transaccion')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/register',Register)
app.use('/api/createAcounts',getCuenta)
app.use('/api/login',login.app)
app.use('/api/home',home)
app.use('/api/transaccion',transac)

//app.get('/', (req,res,next)=>{
//    res.sendfile('./views/index.html')
//})

app.listen(app.get('port'),()=>{
    console.log("estoy conectado al puerto:" + app.get('port'));
    
})

