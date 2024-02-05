const {response} = require('express');
 
const usersGet = (req, res = response)=> {

    const {q,nombre,apiKey} = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apiKey
    })
  }

const usersPut = (req, res)=> {
    
    const id = req.params.id
  
    res.json({
        msg: 'put API - Controlador',
        id
    })
  }

const usersPost = (req, res)=> { 

    const body = req.body;
    res.json({
       
        msg: 'post API - Controlador',
        body
    })
  }

 const usersDelete = (req, res)=> {
    res.json({
        ok: true,
        msg: 'delete API - Controlador'
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