import { Router } from "express";
import {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago,
} from "../controllers/pago.controller.js";
const router = Router();
router.get("/", getPagos);
router.get("/:id", getPagoById);
router.post("/", createPago);
router.put("/", updatePago);
router.delete("/", deletePago);

export default router;
