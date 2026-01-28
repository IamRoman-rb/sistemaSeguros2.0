import { Router } from "express";
import {
  getLocalidades,
  createLocalidad,
  updateLocalidad,
  deleteLocalidad,
} from "../controllers/localidad.controller.js";
import {
  localidadCreateValidation,
  localidadUpdateValidation,
  localidadDeleteValidation,
} from "../validations/localidades.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getLocalidades);
router.post("/", [localidadCreateValidation, validate], createLocalidad);
router.put("/", [localidadUpdateValidation, validate], updateLocalidad);
router.delete("/", [localidadDeleteValidation, validate], deleteLocalidad);
export default router;
