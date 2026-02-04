import { Router } from "express";
import {
  getVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "../controllers/vehiculo.controller.js";
import {
  vehiculoCreateValidation,
  vehiculoUpdateValidation,
  vehiculoDeleteValidation,
} from "../validations/vehiculo.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getVehiculos);
router.get("/:id", getVehiculoById);
router.post("/", [vehiculoCreateValidation, validate], createVehiculo);
router.put("/", [vehiculoUpdateValidation, validate], updateVehiculo);
router.delete("/", [vehiculoDeleteValidation, validate], deleteVehiculo);

export default router;
