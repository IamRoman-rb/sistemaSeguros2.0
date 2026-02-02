import { check } from "express-validator";
import prisma from "../db.js";

export const provinciaCreateValidation = [
  check("provincia")
    .notEmpty()
    .withMessage("El nombre de la provincia es obligatorio")
    .isLength({ max: 255 })
    .withMessage(
      "El nombre de la provincia no puede exceder los 255 caracteres",
    )
    .custom(async (value) => {
      let exists = await prisma.provincia.findUnique({
        where: { provincia: value },
      });
      if (exists) throw new Error("La provincia ya existe");
      return true;
    }),
];

export const provinciaUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la provincia es obligatorio")
    .isInt()
    .withMessage("El ID de la provincia debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID de la provincia debe ser un número entero positivo",
        );
      let exists = await prisma.provincia.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("La provincia no existe");
      return true;
    }),
  check("provincia")
    .optional()
    .isLength({ max: 255 })
    .withMessage(
      "El nombre de la provincia no puede exceder los 255 caracteres",
    )
    .custom(async (value, { req }) => {
      if (value) {
        let exists = await prisma.provincia.findUnique({
          where: { provincia: value },
        });
        if (exists && exists.id !== parseInt(req.body.id))
          throw new Error("La provincia ya existe");
      }
      return true;
    }),
];

export const provinciaDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la provincia es obligatorio")
    .isInt()
    .withMessage("El ID de la provincia debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID de la provincia debe ser un número entero positivo",
        );
      let exists = await prisma.provincia.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("La provincia no existe");
      return true;
    }),
];
