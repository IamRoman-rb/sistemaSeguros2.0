import { check } from "express-validator";
import prisma from "../db.js";

export const sucursalCreateValidation = [
  check("sucursal")
    .notEmpty()
    .withMessage("El nombre de la sucursal es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El nombre de la sucursal no puede exceder los 255 caracteres")
    .custom(async (value) => {
      let sucursalExists = await prisma.sucursal.findUnique({
        where: { sucursal: value },
      });
      if (sucursalExists) {
        throw new Error("La sucursal ya existe");
      }
      return true;
    }),
];

export const sucursalUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la sucursal es obligatorio")
    .isInt()
    .withMessage("El ID de la sucursal debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la sucursal debe ser un número entero positivo",
        );
      }
      let sucursalExists = await prisma.sucursal.findUnique({
        where: { id: parseInt(value) },
      });
      if (!sucursalExists) {
        throw new Error("La sucursal no existe");
      }
      return true;
    }),
  check("sucursal")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El nombre de la sucursal no puede exceder los 255 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        let sucursalExists = await prisma.sucursal.findUnique({
          where: { sucursal: value },
        });
        if (sucursalExists && sucursalExists.id !== parseInt(req.body.id)) {
          throw new Error("La sucursal ya existe");
        }
      }
      return true;
    }),
];

export const sucursalDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la sucursal es obligatorio")
    .isInt()
    .withMessage("El ID de la sucursal debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la sucursal debe ser un número entero positivo",
        );
      }
      let sucursalExists = await prisma.sucursal.findUnique({
        where: { id: parseInt(value) },
      });
      if (!sucursalExists) {
        throw new Error("La sucursal no existe");
      }
      return true;
    }),
];
