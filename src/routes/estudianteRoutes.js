import express from "express";
import checkAuth from "../middleware/checkAuth.js";

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
    .post(checkAuth, agregarEstudiante)
    .get(checkAuth, obtenerEstudiantes);

router
    .route("/:id")
    .get(checkAuth, obtenerEstudiante)
    .put(checkAuth, actualizarEstudiante)
    .delete(checkAuth, eliminarEstudiante)

export default router;
