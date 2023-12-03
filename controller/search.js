const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const permittedCollection = [
    'categories',
    'products',
    'productsByCategory',
    'roles',
    'users'
]

const searchUsers = async (term, res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if(isMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({ 
        $or: [{ name: regex}, {email: regex}],
        $and: [{ status: true }]
       });

    res.json({
        results: users
    });
}
const searchProducts= async (term, res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if(isMongoID) {
        const product = await Product.findById(term).populate('category','name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({ name: regex, status: true }).populate('category','name');

    res.json({
        results: products
    });
}
const searchCategories = async (term, res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if(isMongoID) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const categories = await Category.find({ name: regex, status: true });

    res.json({
        results: categories
    });
}

const searchProductsByCategory = async( term = '', res = response) => {
 
    const isMongoID = ObjectId.isValid( term )
 
    if ( isMongoID ) {
        const product = await Product.find( { category: ObjectId( term ) } )
                                        .populate('category', 'name')
 
        return res.json( {
            results: ( product ) ? [ product ] : []
        })
    }
 
    const regex = new RegExp( term, 'i' )
 
    const categories = await Category.find({ name: regex, status: true})

    if(!categories.length){
        return res.status(400).json({ msg: `Categoria ${term} no existe` });
    }
    
    const products = await Product.find({
        $or: [...categories.map( category => ({
            category: category.id
        }))],
        $and: [{ status: true }]
    }).populate('category', 'name')
 
 
    res.json({
        results: products
    })
 
}

const search = (req, res= response) => {

    const { collection, term } = req.params;

    if(!permittedCollection.includes(collection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${permittedCollection}`
        });
    }

    switch (collection) {
        
        case 'categories' :
            searchCategories(term, res);
            break;
        case 'products' :
            searchProducts(term, res);
            break;
        case 'productsByCategory' :
            searchProductsByCategory(term, res);
            break;
        case 'users' :
            searchUsers(term, res);
            break;
        default :
            res.status(500).json({
                msg: 'Colección no valida'
            });    
    }
}

module.exports = {
    search
}