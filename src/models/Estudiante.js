import mongoose from "mongoose";

const estudianteSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },

    apellido:{
        type:String,
        required:true,
        trim:true
    },

    cedula:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    fecha_nacimiento:{
        type:Date,
        default:null
    },

    ciudad:{
        type:String,
        default:null,
        trim:true
    },

    direccion:{
        type:String,
        trim:true,
        default:null
    },

    telefono:{
        type:String,
        default:null,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
},
{
    timestamps:true
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);
export default Estudiante;