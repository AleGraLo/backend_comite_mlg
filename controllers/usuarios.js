const {request, response} = require('express');
const Usuario = require('../models/usuarios')

const usuariosGet = (req, res)=>{
    const {limit, page} = req.query
    res.json({
        message: "GET usuarios - Controllers",
        limit,
        page,
    })
}
const usuarioPost = async (req, res)=>{
    const {name, email, password}=req.body;

    const usuario = new Usuario ({name, email, password})
    await usuario.save()

    res.status(201).json({
        message: "Usuario Creado",
        usuario,
    })
}
const usuariosPut = (req, res)=>{
    const {id} = req.params;
    res.json({
        message: "PUT usuarios - Controllers",
        id,
    })
}
const usuariosDelete = (req, res)=>{
    res.json({
        message: "DELETE usuarios - Controllers",
    })
}

module.exports= {
    usuarioPost,
    usuariosDelete,
    usuariosGet,
    usuariosPut
}