import { Router } from "express";
import {
  getEmpresas,
  getEmpresaId,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
  addCoberturaToEmpresa,
  removeCoberturaFromEmpresa,
} from "../controllers/empresa.controller.js";
const router = Router();
router.get("/", getEmpresas);
router.get("/:id", getEmpresaId);
router.post("/", createEmpresa);
router.put("/", updateEmpresa);
router.delete("/", deleteEmpresa);
router.post("/add/cobertura", addCoberturaToEmpresa);
router.post("/remove/cobertura", removeCoberturaFromEmpresa);
export default router;
