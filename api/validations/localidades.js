import { check } from "express-validator";
import prisma from "../db.js";

export const localidadCreateValidation = [
  check("localidad")
    .notEmpty()
    .withMessage("El nombre de la localidad es obligatorio")
    .isLength({ max: 100 })
    .withMessage(
      "El nombre de la localidad no puede exceder los 100 caracteres",
    ),
  check("id_provincia")
    .notEmpty()
    .withMessage("El ID de la provincia es obligatorio")
    .isInt()
    .withMessage("El ID de la provincia debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la provincia debe ser un número entero positivo",
        );
      }
      let provinciaExists = await prisma.provincia.findUnique({
        where: { id: parseInt(value) },
      });
      if (!provinciaExists) {
        throw new Error("La provincia no existe");
      }
      return true;
    }),
];

export const localidadUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la localidad es obligatorio")
    .isInt()
    .withMessage("El ID de la localidad debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la localidad debe ser un número entero positivo",
        );
      }
      let localidadExists = await prisma.localidad.findUnique({
        where: { id: parseInt(value) },
      });
      if (!localidadExists) {
        throw new Error("La localidad no existe");
      }
      return true;
    }),
  check("localidad")
    .optional()
    .isLength({ max: 100 })
    .withMessage(
      "El nombre de la localidad no puede exceder los 100 caracteres",
    ),
  check("id_provincia")
    .optional()
    .isInt()
    .withMessage("El ID de la provincia debe ser un número entero")
    .custom(async (value) => {
      if (value && value <= 0) {
        throw new Error(
          "El ID de la provincia debe ser un número entero positivo",
        );
      }
      if (value) {
        let provinciaExists = await prisma.provincia.findUnique({
          where: { id: parseInt(value) },
        });
        if (!provinciaExists) {
          throw new Error("La provincia no existe");
        }
      }
      return true;
    }),
];

export const localidadDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la localidad es obligatorio")
    .isInt()
    .withMessage("El ID de la localidad debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la localidad debe ser un número entero positivo",
        );
      }
      let localidadExists = await prisma.localidad.findUnique({
        where: { id: parseInt(value) },
      });
      if (!localidadExists) {
        throw new Error("La localidad no existe");
      }
      return true;
    }),
];
