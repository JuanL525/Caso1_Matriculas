import mongoose from 'mongoose';

const materiaSchema = mongoose.Schema(
    {
        nombre:{
            type:String,
            required:true,
            trim:true
        },

        codigo:{
            type:String,
            required:true,
            trim:true
        },

        descripcion:{
            type:String,
            required:true,
            trim:true
        },

        creditos:{
            type:Number,
            required:true,
        }
    },
    {
        timestamps:true,
    }
);

const Materia = mongoose.model('Materia', materiaSchema);
export default Materia;