import Materia from '../models/Materia.js';

const agregarMateria = async(req,res)=>{
    const {codigo} = req.body;

    const existeMateria = await Materia.findOne({codigo})
    if(existeMateria){
        const error= new Error('Materia ya registrada')
        return res.status(400).json({msg: error.message})
    } 
    try{
        const materia = new Materia(req.body);
        await materia.save();
        res.json({msg: 'Materia registrada correctamente', ...materia._doc});
        res.json(materia);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al registrar materia'});
    }
    
};

const obtenerMaterias = async(req,res) =>{
    try{
        const materias= await Materia.find();
        res.json(materias);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Hubo un error al obtener las materias'})
    }
}

const obtenerMateria = async(req,res)=>{
    const { id } = req.params;
    try{
        const materias= await Materia.findById(id);
        if(!materias){
            return res.status(404).json({msg:'Materia no encontrada'});
        }
        res.json(materias);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'ID no válido o no encontrado'});
    }
}

const actualizarMateria = async(req,res)=>{
    const{id}=req.params;
    const materia=await Materia.findById(id);

    if(!materia){
        return res.status(404).json({msg:'Materia no encontrada'})
    }

    if(req.body.codigo && req.body.codigo !==materia.codigo){
        const existeCodigo = await Materia.findOne({codigo: req.body.codigo});
        if(existeCodigo){
            return res.status(400).json({msg: 'Ese codigo ya está en uso por otra materia'});
        }
    }
    materia.nombre = req.body.nombre || materia.nombre;
    materia.codigo = req.body.codigo || materia.codigo;
    materia.descripcion = req.body.descripcion || materia.descripcion;
    materia.creditos = req.body.creditos || materia.creditos;

    try{
        const materiaAlmacenada = await materia.save();
        res.json(materiaAlmacenada)
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al actualizar la materia'})
    }
};

const eliminarMateria = async(req,res) =>{
    const { id } = req.params;
    try{
        const materia=await Materia.findById(id);
        if(!materia){
            return res.status(404).json({msg: 'Materia no encontrada'})
        }
        await materia.deleteOne();
        res.json({msg:'Materia eliminada correctamente'})
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar materia'})
    }
}

export{
    agregarMateria,
    obtenerMaterias,
    obtenerMateria,
    actualizarMateria,
    eliminarMateria
}