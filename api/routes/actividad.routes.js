import { Router } from "express";
import {
  getActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
} from "../controllers/actividad.controller.js";
import {
  actividadCreationValidation,
  actividadUpdateValidation,
  actividadDeletionValidation,
} from "../validations/actividad.js";
import { validate } from "../middlewares/validate.js";
const router = Router();

router.get("/", getActividades);
router.get("/:id", getActividadById);
router.post("/", [actividadCreationValidation, validate], createActividad);
router.put("/", [actividadUpdateValidation, validate], updateActividad);
router.delete("/", [actividadDeletionValidation, validate], deleteActividad);
export default router;
