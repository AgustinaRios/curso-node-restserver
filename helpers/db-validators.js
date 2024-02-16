const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no está registrado en la BD`)
    } 
  }


const emailExiste = async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
      
     throw new Error('El correo ingresado ya se encuentra registrado');
    }

}

const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
      
     throw new Error(`El ID ${id} no existe en la DB`);
    }

}
  

  module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
  }