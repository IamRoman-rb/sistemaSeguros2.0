import { check } from "express-validator";
import prisma from "../db.js";

export const marcaCreateValidation = [
  check("marca")
    .notEmpty()
    .withMessage("El nombre de la marca es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El nombre de la marca no puede exceder los 255 caracteres")
    .custom(async (value) => {
      let marcaExists = await prisma.marca.findUnique({
        where: { marca: value },
      });
      if (marcaExists) {
        throw new Error("La marca ya existe");
      }
      return true;
    }),
];

export const marcaUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la marca es obligatorio")
    .isInt()
    .withMessage("El ID de la marca debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID de la marca debe ser un número entero positivo");
      }
      let marcaExists = await prisma.marca.findUnique({
        where: { id: parseInt(value) },
      });
      if (!marcaExists) {
        throw new Error("La marca no existe");
      }
      return true;
    }),
  check("marca")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El nombre de la marca no puede exceder los 255 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        let marcaExists = await prisma.marca.findUnique({
          where: { marca: value },
        });
        if (marcaExists && marcaExists.id !== parseInt(req.body.id)) {
          throw new Error("La marca ya existe");
        }
      }
      return true;
    }),
];

export const marcaDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la marca es obligatorio")
    .isInt()
    .withMessage("El ID de la marca debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID de la marca debe ser un número entero positivo");
      }
      let marcaExists = await prisma.marca.findUnique({
        where: { id: parseInt(value) },
      });
      if (!marcaExists) {
        throw new Error("La marca no existe");
      }
      return true;
    }),
];
