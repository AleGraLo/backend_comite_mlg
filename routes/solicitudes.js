const express = require('express')
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('material', 'El material es obligatorio').not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }
    
    const { name, email, material, comments} = req.body;
    console.log('Solicitud recibida:', { name, email, material, comments});

    res.status(200).send('Solcitud recibida');
});

module.exports = router
