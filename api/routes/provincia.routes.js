import { Router } from "express";
import {
  getProvincias,
  createProvincia,
  updateProvincia,
  deleteProvincia,
} from "../controllers/provincia.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  provinciaCreateValidation,
  provinciaUpdateValidation,
  provinciaDeleteValidation,
} from "../validations/provincia.js";
const router = Router();
router.get("/", getProvincias);
router.post("/", [provinciaCreateValidation, validate], createProvincia);
router.put("/", [provinciaUpdateValidation, validate], updateProvincia);
router.delete("/", [provinciaDeleteValidation, validate], deleteProvincia);

export default router;
