import { Router } from "express";
import {
  getSucursales,
  getSucursalId,
  createSucursal,
  updateSucursal,
  deleteSucursal,
} from "../controllers/sucursal.controller.js";
const router = Router();
router.get("/", getSucursales);
router.get("/:id", getSucursalId);
router.post("/", createSucursal);
router.put("/", updateSucursal);
router.delete("/", deleteSucursal);

export default router;
