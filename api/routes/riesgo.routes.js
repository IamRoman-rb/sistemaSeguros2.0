import { Router } from "express";
import {
  getRiesgos,
  getRiesgoId,
  getCoberturasByRiesgo,
  createRiesgo,
  updateRiesgo,
  deleteRiesgo,
  addCoberturaToRiesgo,
  removeCoberturaFromRiesgo,
} from "../controllers/riesgo.controller.js";
const router = Router();
router.get("/", getRiesgos);
router.get("/:id", getRiesgoId);
router.get("/coberturas/:id", getCoberturasByRiesgo);
router.post("/", createRiesgo);
router.put("/", updateRiesgo);
router.delete("/", deleteRiesgo);
router.post("/add/cobertura", addCoberturaToRiesgo);
router.delete("/remove/cobertura", removeCoberturaFromRiesgo);
export default router;
