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
import {
  empresaCreateValidation,
  empresaUpdateValidation,
  empresaDeleteValidation,
  addCoberturaToEmpresaValidation,
  removeCoberturaToEmpresaValidation,
} from "../validations/empresa.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getEmpresas);
router.get("/:id", getEmpresaId);
router.post("/", [empresaCreateValidation, validate], createEmpresa);
router.put("/", [empresaUpdateValidation, validate], updateEmpresa);
router.delete("/", [empresaDeleteValidation, validate], deleteEmpresa);
router.post(
  "/add/cobertura",
  [addCoberturaToEmpresaValidation, validate],
  addCoberturaToEmpresa,
);
router.post(
  "/remove/cobertura",
  [removeCoberturaToEmpresaValidation, validate],
  removeCoberturaFromEmpresa,
);
export default router;
