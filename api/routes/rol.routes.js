import { Router } from "express";
import {
  getRoles,
  getRolId,
  createRol,
  updateRol,
  deleteRol,
} from "../controllers/rol.controller.js";
import {
  rolCreateValidation,
  rolUpdateValidation,
  rolDeleteValidation,
} from "../validations/rol.js";
import { validate } from "../middlewares/validate.js";
const router = Router();
router.get("/", getRoles);
router.get("/:id", getRolId);
router.post("/", [rolCreateValidation, validate], createRol);
router.put("/", [rolUpdateValidation, validate], updateRol);
router.delete("/", [rolDeleteValidation, validate], deleteRol);

export default router;
