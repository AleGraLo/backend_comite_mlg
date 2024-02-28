const {Router} = require("express");
const { usuariosGet, usuariosPut, usuariosDelete, usuarioPost } = require("../controllers/usuarios");

const router = Router ();

router.get ('/', usuariosGet)

router.put ('/:id', usuariosPut)

router.post ('/', usuarioPost)

router.delete ('/', usuariosDelete)

module.exports=router