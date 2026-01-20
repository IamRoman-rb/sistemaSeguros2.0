import { Router } from "express";
import {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  validateEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/empleado.controller.js";

const router = Router();
router.get("/", getEmpleados);
router.get("/:id", getEmpleadoById);
router.post("/", createEmpleado);
router.post("/validate", validateEmpleado);
router.put("/", updateEmpleado);
router.delete("/", deleteEmpleado);

export default router;
