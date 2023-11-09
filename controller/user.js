const { response, request } = require('express');

const usersGet = (req = request, res = response) => {

    const query =  req.query;
    res.json({
        msg: 'GET USERS',
        query
    });
}

const usersPost = (req = request, res = response) => {

    const {name, edad} = req.body;
    res.json({
        msg: 'POST USERS',
        name,
        edad
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