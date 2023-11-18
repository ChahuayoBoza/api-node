const Role = require('../models/role');
const User = require('../models/user');

const isRoleValidate = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if(!existRole) {
      throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }
  }

const existEmail = async (email = '') => {
  const existMail = await User.findOne({email});

  if(existMail){
    throw new Error(`El email ${email} ya esta registrado en la base de datos`);
  };
} 

const existUserById = async (id) => {
  const existUser = await User.findById(id);

  if(!existUser){
    throw new Error(`El ${id} no existe`);
  };
} 

  

module.exports = {
    isRoleValidate,
    existEmail,
    existUserById
}  