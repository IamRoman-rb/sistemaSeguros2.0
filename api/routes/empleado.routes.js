import { Router } from "express";
import {
  getEmpleados,
  getEmpleadoId,
  createEmpleado,
  validateEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/empleado.controller.js";

const router = Router();
router.get("/", getEmpleados);
router.get("/:id", getEmpleadoId);
router.post("/", createEmpleado);
router.post("/validate", validateEmpleado);
router.put("/", updateEmpleado);
router.delete("/", deleteEmpleado);

export default router;
