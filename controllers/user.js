const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usersGet = async (req, res = response)=> {

    // const {q,nombre,apiKey} = req.query;
    const {limite =5, desde=0} = req.query;
    const query = {estado:true}

    /*const usuarios = await Usuario.find({query})
        .skip(Number(desde))
        .limit(Number(limite));
    const total = await Usuario.countDocuments({query});  */
    
    const [total,usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
     
      total,
      usuarios
    })
  }

const usersPut = async (req, res)=> {
    
    const id = req.params.id;
    const {google,password,correo,...resto} = req.body;

    //validar contra DB
    if(password){
      //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password,salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto); 



    res.json(usuario)
  }

const usersPost = async (req, res)=> { 
    
   

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //verificar si el correo existe
    
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar en DB
    await  usuario.save();

    res.json({
       
        msg: 'post API - Controlador',
        usuario
    })
  }

 const usersDelete = async (req, res)=> {

    const {id} = req.params

    //Borrado físico
    //const usuario = await Usuario.findByIdandDelete(id);
    
    //Borrado lógico
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({
       usuario
    })
  }

  const usersPatch = (req, res)=> {
    res.json({
        ok: true,
        msg: 'patch API - Controlador'
    })
  }

  module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
  }