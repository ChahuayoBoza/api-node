const { v4: uuidv4 } = require('uuid');

const path = require('path');

const uploadFile = (files, validateExtensions=['png', 'jpg', 'jpeg', 'gif'], carpeta='') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const splitName = file.name.split('.');
        const extension = splitName[splitName.length - 1];

        //Extension Validation

        if(!validateExtensions.includes(extension)){
            return reject(`La extension no es permitida`); 
        }

        const tempName = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads',carpeta, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

           resolve(tempName);
        });
    });  

}

module.exports = {
    uploadFile
}