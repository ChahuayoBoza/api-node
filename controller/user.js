const { response, request } = require('express');
const User = require('../models/user');

const usersGet = (req = request, res = response) => {

    const query =  req.query;
    res.json({
        msg: 'GET USERS',
        query
    });
}

const usersPost = async (req = request, res = response) => {

    const body = req.body;
    const user = new User(body);
    await user.save();
    res.json({
        msg: 'POST USERS',
        user
    });
}

const usersPut = (req, res = response) => {

    const {id} = req.params;
    res.json({
        msg: 'PUT USERS',
        id
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE USERS'
    });
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}