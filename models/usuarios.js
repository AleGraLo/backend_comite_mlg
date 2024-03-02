const {Schema,model}=require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type:String,
        required:[true, 'El campo es obligatorio']
    },
    email:{
        type:String,
        require:[true, 'El correo es obligatorio'],
        unique : true
    },
    password:{
        type : String,
        required : [true,'La contraseña es obligatoria']
    },
    roll : {
        type:String,
        enum:['ADMIN_ROLE', 'USER_ROLE'],
        default:'USER_ROLE'
    },
    img:{
        type:String
    },
    state:{
        type: Boolean,
        default: true
    }
})

module.exports= model('Usuario', UsuarioSchema)