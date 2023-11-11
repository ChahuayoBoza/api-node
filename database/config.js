const { default: mongoose } = require("mongoose");

const dbConnection = async() => {
    try {

        await mongoose.connect( process.env.MONGO_DB);
        console.log("Base de datos conectada")
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al intentar conectar')
    }
}

module.exports = {
    dbConnection
}