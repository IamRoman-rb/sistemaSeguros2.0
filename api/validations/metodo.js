import { check } from "express-validator";
import prisma from "../db.js";

export const metodoCreateValidation = [
  check("metodo")
    .notEmpty()
    .withMessage("El nombre del método es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El nombre del método no puede exceder los 255 caracteres")
    .custom(async (value) => {
      let metodoExists = await prisma.metodo.findUnique({
        where: { metodo: value },
      });
      if (metodoExists) {
        throw new Error("El método ya existe");
      }
      return true;
    }),
];

export const metodoUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del método es obligatorio")
    .isInt()
    .withMessage("El ID del método debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID del método debe ser un número entero positivo");
      }
      let metodoExists = await prisma.metodo.findUnique({
        where: { id: parseInt(value) },
      });
      if (!metodoExists) {
        throw new Error("El método no existe");
      }
      return true;
    }),
  check("metodo")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El nombre del método no puede exceder los 255 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        let metodoExists = await prisma.metodo.findUnique({
          where: { metodo: value },
        });
        if (metodoExists && metodoExists.id !== parseInt(req.body.id)) {
          throw new Error("El método ya existe");
        }
      }
      return true;
    }),
];

export const metodoDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del método es obligatorio")
    .isInt()
    .withMessage("El ID del método debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID del método debe ser un número entero positivo");
      }
      let metodoExists = await prisma.metodo.findUnique({
        where: { id: parseInt(value) },
      });
      if (!metodoExists) {
        throw new Error("El método no existe");
      }
      return true;
    }),
];
