import { check } from "express-validator";
import prisma from "../db.js";

export const rolCreateValidation = [
  check("rol")
    .notEmpty()
    .withMessage("El nombre del rol es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre del rol no puede exceder los 100 caracteres")
    .custom(async (value) => {
      let rolExists = await prisma.rol.findUnique({ where: { rol: value } });
      if (rolExists) {
        throw new Error("El rol ya existe");
      }
      return true;
    }),
];

export const rolUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del rol es obligatorio")
    .isInt()
    .withMessage("El ID del rol debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID del rol debe ser un número entero positivo");
      }
      let rolExists = await prisma.rol.findUnique({
        where: { id: parseInt(value) },
      });
      if (!rolExists) {
        throw new Error("El rol no existe");
      }
      return true;
    }),
  check("rol")
    .optional()
    .isLength({ max: 100 })
    .withMessage("El nombre del rol no puede exceder los 100 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        let rolExists = await prisma.rol.findUnique({ where: { rol: value } });
        if (rolExists && rolExists.id !== parseInt(req.body.id)) {
          throw new Error("El rol ya existe");
        }
      }
      return true;
    }),
];

export const rolDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del rol es obligatorio")
    .isInt()
    .withMessage("El ID del rol debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID del rol debe ser un número entero positivo");
      }
      let rolExists = await prisma.rol.findUnique({
        where: { id: parseInt(value) },
      });
      if (!rolExists) {
        throw new Error("El rol no existe");
      }
      return true;
    }),
];
