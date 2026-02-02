import { check } from "express-validator";
import prisma from "../db.js";

export const riesgoCreateValidation = [
  check("riesgo")
    .notEmpty()
    .withMessage("El nombre del riesgo es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El nombre del riesgo no puede exceder los 255 caracteres")
    .custom(async (value) => {
      let exists = await prisma.riesgo.findUnique({ where: { riesgo: value } });
      if (exists) throw new Error("El riesgo ya existe");
      return true;
    }),
];

export const riesgoUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del riesgo es obligatorio")
    .isInt()
    .withMessage("El ID del riesgo debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error("El ID del riesgo debe ser un número entero positivo");
      let exists = await prisma.riesgo.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("El riesgo no existe");
      return true;
    }),
  check("riesgo")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El nombre del riesgo no puede exceder los 255 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        let exists = await prisma.riesgo.findUnique({
          where: { riesgo: value },
        });
        if (exists && exists.id !== parseInt(req.body.id))
          throw new Error("El riesgo ya existe");
      }
      return true;
    }),
];

export const riesgoDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del riesgo es obligatorio")
    .isInt()
    .withMessage("El ID del riesgo debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error("El ID del riesgo debe ser un número entero positivo");
      let exists = await prisma.riesgo.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("El riesgo no existe");
      return true;
    }),
];

export const addCoberturaToRiesgoValidation = [
  check("id_riesgo")
    .notEmpty()
    .withMessage("El ID del riesgo es obligatorio")
    .isInt()
    .withMessage("El ID del riesgo debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error("El ID del riesgo debe ser un número entero positivo");
      let exists = await prisma.riesgo.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("El riesgo no existe");
      return true;
    }),
  check("id_cobertura")
    .notEmpty()
    .withMessage("El ID de la cobertura es obligatorio")
    .isInt()
    .withMessage("El ID de la cobertura debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID de la cobertura debe ser un número entero positivo",
        );
      let exists = await prisma.cobertura.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("La cobertura no existe");
      return true;
    }),
];

export const removeCoberturaFromRiesgoValidation = [
  check("id_riesgo")
    .notEmpty()
    .withMessage("El ID del riesgo es obligatorio")
    .isInt()
    .withMessage("El ID del riesgo debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error("El ID del riesgo debe ser un número entero positivo");
      let exists = await prisma.riesgo.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("El riesgo no existe");
      return true;
    }),
  check("id_cobertura")
    .notEmpty()
    .withMessage("El ID de la cobertura es obligatorio")
    .isInt()
    .withMessage("El ID de la cobertura debe ser un número entero")
    .custom(async (value, { req }) => {
      if (value <= 0)
        throw new Error(
          "El ID de la cobertura debe ser un número entero positivo",
        );
      let exists = await prisma.cobertura.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("La cobertura no existe");
      let relationExists = await prisma.cobertura_riesgo.findFirst({
        where: {
          id_riesgo: parseInt(req.body.id_riesgo),
          id_cobertura: parseInt(value),
        },
      });
      if (!relationExists)
        throw new Error("La cobertura no está asociada al riesgo");
      return true;
    }),
];
