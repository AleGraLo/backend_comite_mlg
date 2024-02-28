const usuariosGet = (req, res)=>{
    const {limit, page} = req.query
    res.json({
        message: "GET usuarios - Controllers",
        limit,
        page,
    })
}
const usuarioPost = (req, res)=>{
    const {nombre, correo}=req.body;
    res.json({
        message: "POST usuarios - Controllers",
        nombre,
        correo,
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