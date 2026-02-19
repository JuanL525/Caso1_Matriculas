import Matricula from '../models/Matricula.js';

const agregarMatricula = async(req,res) =>{
    const {codigo} = req.body;

    const existeMatricula = await Matricula.findOne({codigo});
    if(existeMatricula){
        const error = new Error('Matricula ya existente');
        return res.status(400).json({msg:error.message})
    }
    try{
        const matricula = new Matricula(req.body);
        await matricula.save();
        res.json({msg: 'Matricula registrada exitosamente', ...matricula._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al registrar la matricula'});
    }

};

const obtenerMatriculas = async(req,res)=>{
    try{
        const matriculas=await Matricula.find()
            .populate('id_estudiante','nombre apellido cedula email')
            .populate('id_materia', 'nombre codigo');
        res.json(matriculas);
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Hubo un error al obtener las matrículas'})
    }
};

const obtenerMatricula = async(req,res)=>{
    const {id} = req.params;
    try{
        const matricula = await Matricula.findById(id)
            .populate('id_estudiante', 'nombre apellido') 
            .populate('id_materia', 'nombre');

        if(!matricula){
            return res.status(404).json({msg:'Matricula no encontrada'});
        }
        res.json(matricula);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'ID no válido o no encontrado'});
    }
};


const actualizarMatricula = async(req,res)=>{
    const{id}=req.params;
    const matricula = await Matricula.findById(id);

    if(!matricula){
        return res.status(404).json({msg:'La matricula a actualizar no existe'});
    }

    if(req.body.codigo && req.body.codigo !== matricula.codigo){
        const existeCodigo=await Matriculas.findOne({codigo: req.body.codigo});
        if(existeCodigo){
            return res.status(400).json({msg:'Ese codigo ya esta en uso'});
        }
    }

    matricula.codigo = req.body.codigo || matricula.codigo;
    matricula.descripcion = req.body.descripcion || matricula.descripcion;
    matricula.id_estudiante = req.body.id_estudiante || matricula.id_estudiante;
    matricula.id_materia = req.body.id_materia || matricula.id_materia;

    try{
        const matriculaActualizada = await matricula.save();
        res.json(matriculaActualizada);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al actualizar la matricula'});
    }
};

const eliminarMatricula = async(req,res) =>{
    const { id } = req.params;
    try{
        const matricula=await Matricula.findById(id);
        if(!matricula){
            return res.status(404).json({msg: 'Matricula no encontrada'})
        }
        await matricula.deleteOne();
        res.json({msg:'Matricula eliminada correctamente'})
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar matricula'})
    }
}

export{
    agregarMatricula,
    obtenerMatricula,
    obtenerMatriculas,
    eliminarMatricula,
    actualizarMatricula
}