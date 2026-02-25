import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import cors from 'cors';

import usuarioRoutes from './routes/usuarioRoutes.js'
import materiaRoutes from './routes/materiaRoutes.js'
import estudianteRoutes from './routes/estudianteRoutes.js'
import matrciulaRoutes from './routes/matriculaRoutes.js'

// 1. Cargar variables de entorno primero
dotenv.config();

const app = express();

// 2. Definir la lista blanca (SIN la barra '/' al final de la URL de Netlify)
const whitelist = [
    'http://127.0.0.1:5501', 
    'http://localhost:5501', 
    'http://127.0.0.1:4000', 
    'http://localhost:4000',
    'https://caso1-matriculas-frontdend.netlify.app' // <-- Importante: SIN '/' al final
];

// 3. Configurar las opciones de CORS
const corsOptions = {
    origin: function (origin, callback) {
        // !origin permite peticiones sin origen (como Postman o Server-to-Server)
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            console.log("Origen bloqueado por CORS:", origin); // Log para depurar en Render
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // A veces necesario si envían cookies o headers seguros
};

// 4. Aplicar CORS antes que todo lo demás
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Habilitar pre-flight para todas las rutas

// 5. Habilitar lectura de JSON
app.use(express.json());

// 6. Conectar a Base de Datos
conectarDB();

// 7. Ruta de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido a la API del Sistema de Matrículas');
});

// 8. Rutas de la API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/matriculas/', matrciulaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});