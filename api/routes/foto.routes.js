import { Router } from "express";
import {
  getFotos,
  createFoto,
  updateFoto,
  deleteFoto,
} from "../controllers/foto.controller.js";
import upload from "../middlewares/upload.js";
const router = Router();

router.get("/", getFotos);
router.post("/", [upload.any()], createFoto);
router.put("/", [upload.any()], updateFoto);
router.delete("/", [], deleteFoto);
export default router;
