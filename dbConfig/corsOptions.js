const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin : (origin , callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null , true)
        }else{
            callback(new Error('Not Allowed by Cors'))
        }
    },
    credentials : true,
    optionsSucessStatus : 200
}

module.exporst = corsOptions