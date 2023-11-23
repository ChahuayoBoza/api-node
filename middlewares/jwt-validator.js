const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg : 'No se envio el token'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token Invalido'
        });
    }

    console.log(token);
}

module.exports = {
    validateJWT
}