const { request, response } = require("express");
const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usuariosGet = async (req, res) => {
  try {
    const { limit = 5, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(),
      Usuario.find().skip(skip).limit(number(limit)),
    ]);

    res.json({
      total,
      usuarios
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

const usuarioPost = async (req, res) => {
  const { name, email, password } = req.body;

  //Verificar si el usuario ya existe
  const existingUser = await Usuario.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  //Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 12);

  //Crear nuevo usuario
  const usuario = new Usuario({ name, email, password: hashedPassword });
  await usuario.save();

  res.status(201).json({
    message: "Usuario Creado",
    usuario,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Verificar si el usuaruio existe
    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    //Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    //Generar el token de sesión
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const usuariosPut = async(req, res) => {
  const { id } = req.params;
  const { password, google, email, ...rest} = req.body;

  //si el usuario quiere actualizar la contraseña, hashearla
  if(password) {
    const salt = bcrypt.genSaltSync();
    res.password = bcrypt.hashSync(password, salt);
  }

  try {
    const usuario = await Usuario.findByIdAndUpdate(id, rest, { new: true});
    rest.json({
        message: 'Usuario actualizado',
        usuario
    })
  }catch (error) {
    console.error(error);
    res.status(500).json({
        message: 'Error en el servidor'
    });
  }
};

const usuariosDelete = async(req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByIdAndDelete(id);
        res.json({
            message: 'Usuario Eliminado',
            usuario
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
} 

module.exports = {
  usuarioPost,
  loginUser,
  usuariosDelete,
  usuariosGet,
  usuariosPut,
};
