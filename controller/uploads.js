const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");
const { User, Product } = require("../models");

const uploadArchive= async(req, res = response) => {

    try {

        //Otros archivos
        // const name = await uploadFile(req.files, ['txt', 'md'], 'texts');
        const name = await uploadFile(req.files, undefined, 'imgs');

        res.json({
            name
        });
        
    } catch (msg) {
        res.status(400).json({
            msg
        });
    }
    
};

const updateImage = async (req, res = response) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe el usuario con id: ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe el producto con id: ${id}`
                });
            }
            break;
    
        default:
            return res.status(500).json({msg: 'No se puede validar las colecciones'});
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

     res.json({
        model
     });
}

module.exports = {
    uploadArchive,
    updateImage
};
