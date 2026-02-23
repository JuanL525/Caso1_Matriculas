import express from "express";
/*import checkAuth from "../middleware/checkAuth.js";*/

import {
    agregarEstudiante,
    obtenerEstudiantes,
    obtenerEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
} from '../controllers/estudianteController.js';

const router = express.Router();

router
    .route("/")
    .post(agregarEstudiante)
    .get(obtenerEstudiantes);

router
    .route("/:id")
    .get(obtenerEstudiante)
    .put(actualizarEstudiante)
    .delete(eliminarEstudiante)

export default router;
