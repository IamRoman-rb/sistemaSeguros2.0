import { Router } from "express";
import {
  getSucursales,
  getSucursalId,
  createSucursal,
  updateSucursal,
  deleteSucursal,
} from "../controllers/sucursal.controller.js";
import {
  sucursalCreateValidation,
  sucursalUpdateValidation,
  sucursalDeleteValidation,
} from "../validations/sucursal.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getSucursales);
router.get("/:id", getSucursalId);
router.post("/", [sucursalCreateValidation, validate], createSucursal);
router.put("/", [sucursalUpdateValidation, validate], updateSucursal);
router.delete("/", [sucursalDeleteValidation, validate], deleteSucursal);

export default router;
