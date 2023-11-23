const { response } = require("express");

const isAdminRole = (req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere verfiicar el role sin antes validar el token'
        });
    }

    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no esta autorizado para realizar la acción`
        });
    }
    next();
}

const hasRole = (...roles) => {
    return (req, res=response, next) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere verfiicar el role sin antes validar el token'
            });
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `El servicio re quiere un rol ${roles}`
            });
        }

        console.log(roles, req.user.role);
        next();
    }
}

module.exports = {
    isAdminRole, 
    hasRole
}