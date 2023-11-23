const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { existEmail } = require('../helpers/validators-bd');

const usersGet = async (req = request, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const query = { status : true }

// Sin Optimizar el tiempo de respuesta
    // const users = await User.find(query)
    // .skip(Number(from))
    // .limit(Number(limit));
    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
       .skip(Number(from))
       .limit(Number(limit))
    ]);
    res.json({total, users});
}

const usersPost = async (req = request, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    //Guardar en base de datos
    await user.save();

    res.json({
        msg: 'POST USERS',
        user
    });
}

const usersPut = async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    if (password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);
    res.json({
        msg: 'PUT USERS',
        id
    });
}

const usersDelete = async (req, res = response) => {
    const {id} = req.params;
    const uid = req.uid;
    const user = await User.findByIdAndUpdate(id, { status: false }, {new:true});
    res.json({id, uid, user});
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}