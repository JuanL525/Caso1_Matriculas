import express from "express";
import checkAuth from "../middleware/checkAuth.js";

import {
    agregarMateria,
    obtenerMaterias,
    obtenerMateria,
    actualizarMateria,
    eliminarMateria
} from '../controllers/materiaController.js';

const router = express.Router();

router
    .route("/")
    .post(checkAuth, agregarMateria)
    .get(checkAuth, obtenerMaterias);

router
    .route("/:id")
    .get(checkAuth, obtenerMateria)
    .put(checkAuth, actualizarMateria)
    .delete(checkAuth, eliminarMateria)

export default router;
