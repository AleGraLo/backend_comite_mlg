const express = require('express');
const {Router} = require("express");
const { usuariosGet, usuariosPut, usuariosDelete, usuarioPost,loginUser } = require("../controllers/usuarios");
const router = express.Router ();

router.get ('/', usuariosGet);
router.put ('/:id', usuariosPut);
router.post ('/register', usuarioPost);
router.post ('/login', loginUser);
router.delete ('/:id', usuariosDelete);

module.exports=router