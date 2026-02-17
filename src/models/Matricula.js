import mongoose from "mongoose";

const matriculaSchema = mongoose.Schema({
    codigo:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    descripcion:{
        type:String,
        trim:true,
        default:null
    },

    id_estudiante:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Estudiante',
        required:true
    },

    id_materia:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Materia',
        required:true
    }
},
{
    timestamps:true,
});

const Matricula = mongoose.model('Matricula', matriculaSchema);
export default Matricula;


