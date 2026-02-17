import Estudiante from '../models/Estudiante.js';

const agregarEstudiante = async(req,res)=>{
    const {cedula} = req.body;

    const existeEstudiante = await Estudiante.findOne({cedula})
    if(existeEstudiante){
        const error= new Error('Estudiante ya registrado')
        return res.status(400).json({msg: error.message})
    } 
    try{
        const estudiante = new Estudiante(req.body);
        await estudiante.save();
        res.json({msg: 'Estudiante registrado correctamente', ...Estudiante._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al registrar Estudiante'});
    }
    
};

const obtenerEstudiantes = async(req,res) =>{
    try{
        const estudiantes= await Estudiante.find();
        res.json(estudiantes);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Hubo un error al obtener las Estudiantes'})
    }
}

const obtenerEstudiante = async(req,res)=>{
    const { id } = req.params;
    try{
        const estudiantes= await Estudiante.findById(id);
        if(!estudiantes){
            return res.status(404).json({msg:'Estudiante no encontrado'});
        }
        res.json(estudiantes);
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'ID no válido o no encontrado'});
    }
}

const actualizarEstudiante = async(req,res)=>{
    const{id}=req.params;
    const estudiante=await Estudiante.findById(id);

    if(!estudiante){
        return res.status(404).json({msg:'Estudiante no encontrado'})
    }

    if(req.body.cedula && req.body.cedula !== estudiante.cedula){
        const existecedula = await Estudiante.findOne({cedula: req.body.cedula});
        if(existecedula){
            return res.status(400).json({msg: 'Esa cedula ya está en uso por otra Estudiante'});
        }
    }
    estudiante.nombre = req.body.nombre || estudiante.nombre;
    estudiante.apellido=req.body.apellido || estudiante.apellido;
    estudiante.cedula = req.body.cedula || estudiante.cedula;
    estudiante.fecha_nacimiento = req.body.fecha_nacimiento || estudiante.fecha_nacimiento;
    estudiante.ciudad = req.body.ciudad || estudiante.ciudad;
    estudiante.direccion = req.body.direccion || estudiante.direccion;
    estudiante.telefono = req.body.telefono || estudiante.telefono;
    estudiante.email = req.body.email || estudiante.email;

    try{
        const estudianteAlmacenada = await estudiante.save();
        res.json(estudianteAlmacenada)
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al actualizar la Estudiante'})
    }
};

const eliminarEstudiante = async(req,res) =>{
    const { id } = req.params;
    try{
        const estudiante=await Estudiante.findById(id);
        if(!estudiante){
            return res.status(404).json({msg: 'Estudiante no encontrada'})
        }
        await estudiante.deleteOne();
        res.json({msg:'Estudiante eliminado correctamente'})
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar Estudiante'})
    }
}

export{
    agregarEstudiante,
    obtenerEstudiantes,
    obtenerEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}