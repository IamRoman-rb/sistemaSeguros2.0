import { Router } from "express";
import {
  getEmpleados,
  getEmpleadoId,
  createEmpleado,
  validateEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/empleado.controller.js";
import {
  empleadoCreateValidation,
  empleadoUpdateValidation,
  empleadoDeleteValidation,
  empleadoValidateValidation,
} from "../validations/empleado.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getEmpleados);
router.get("/:id", getEmpleadoId);
router.post("/", [empleadoCreateValidation, validate], createEmpleado);
router.post(
  "/validate",
  [empleadoValidateValidation, validate],
  validateEmpleado,
);
router.put("/", [empleadoUpdateValidation, validate], updateEmpleado);
router.delete("/", [empleadoDeleteValidation, validate], deleteEmpleado);
export default router;
