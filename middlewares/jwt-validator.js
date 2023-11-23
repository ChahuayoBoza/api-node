const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User  = require('../models/user');

const validateJWT = async  (req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg : 'No se envio el token'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
       

       const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Usuario no existe'
            });
        }

        if(!user.status) {
            return res.status(401).json({
                msg: 'Usuario borrado'
            });
        }

        req.user = user;

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