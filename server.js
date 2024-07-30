require('dotenv').config()
const express = require('express')
const trycon = require('./dbConfig/dbConn')
const mongoose = require('mongoose')
const cors = require('cors')
const corsOptions = require('./dbConfig/corsOptions')

const app = express()
const PORT = process.env.PORT || 3500

trycon()
app.use(cors(corsOptions))
app.use(express.json())


app.use('/employees' , require('./routes/employeeRoutes'))

app.use('/dash' , require('./routes/dashboardRoutes'))

mongoose.connection.once('open'  , () => {
    console.log('Connected to DB')
    app.listen(PORT , ()=> {console.log(`listening to port  ${PORT}`)})
})

mongoose.connection.on('error' , err => {
    console.log(err)
    // logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
