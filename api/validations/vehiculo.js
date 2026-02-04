import { check } from "express-validator";
import prisma from "../db.js";

const currentYear = new Date().getFullYear();

export const vehiculoCreateValidation = [
  check("patente")
    .notEmpty()
    .withMessage("La patente es obligatoria")
    .isLength({ max: 20 })
    .withMessage("La patente no puede exceder los 20 caracteres")
    .custom(async (value) => {
      let vehiculoExists = await prisma.vehiculo.findUnique({
        where: { patente: value },
      });
      if (vehiculoExists) {
        throw new Error("La patente ya existe");
      }
      return true;
    }),
  check("modelo")
    .notEmpty()
    .withMessage("El modelo es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El modelo no puede exceder los 100 caracteres"),
  check("anio")
    .notEmpty()
    .withMessage("El año es obligatorio")
    .isInt()
    .withMessage("El año debe ser un número entero")
    .custom((value) => {
      const y = parseInt(value);
      if (y < 1900 || y > currentYear + 1) {
        throw new Error(`El año debe estar entre 1900 y ${currentYear + 1}`);
      }
      return true;
    }),
  check("suma")
    .notEmpty()
    .withMessage("La suma asegurada es obligatoria")
    .isFloat({ gt: 0 })
    .withMessage("La suma debe ser un número decimal positivo"),
  check("chasis")
    .notEmpty()
    .withMessage("El chasis es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El chasis no puede exceder los 255 caracteres")
    .custom(async (value) => {
      let chasisExists = await prisma.vehiculo.findUnique({
        where: { chasis: value },
      });
      if (chasisExists) throw new Error("El chasis ya existe");
      return true;
    }),
  check("motor")
    .notEmpty()
    .withMessage("El motor es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El motor no puede exceder los 255 caracteres")
    .custom(async (value) => {
      let motorExists = await prisma.vehiculo.findUnique({
        where: { motor: value },
      });
      if (motorExists) throw new Error("El motor ya existe");
      return true;
    }),
  check("id_marca")
    .notEmpty()
    .withMessage("El ID de la marca es obligatorio")
    .isInt()
    .withMessage("El ID de la marca debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error("El ID de la marca debe ser un número entero positivo");
      let marcaExists = await prisma.marca.findUnique({
        where: { id: parseInt(value) },
      });
      if (!marcaExists) throw new Error("La marca no existe");
      return true;
    }),
];

export const vehiculoUpdateValidation = [
  check("patente")
    .notEmpty()
    .withMessage("La patente es obligatoria para actualizar el vehículo")
    .custom(async (value) => {
      let vehiculoExists = await prisma.vehiculo.findUnique({
        where: { patente: value },
      });
      if (!vehiculoExists) throw new Error("El vehículo no existe");
      return true;
    }),
  check("modelo")
    .optional()
    .isLength({ max: 100 })
    .withMessage("El modelo no puede exceder los 100 caracteres"),
  check("anio")
    .optional()
    .isInt()
    .withMessage("El año debe ser un número entero")
    .custom((value) => {
      if (value) {
        const y = parseInt(value);
        if (y < 1900 || y > currentYear + 1) {
          throw new Error(`El año debe estar entre 1900 y ${currentYear + 1}`);
        }
      }
      return true;
    }),
  check("suma")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("La suma debe ser un número decimal positivo"),
  check("chasis")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El chasis no puede exceder los 255 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        let chasisExists = await prisma.vehiculo.findUnique({
          where: { chasis: value },
        });
        if (chasisExists && chasisExists.patente !== req.body.patente)
          throw new Error("El chasis ya existe en otro vehículo");
      }
      return true;
    }),
  check("motor")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El motor no puede exceder los 255 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        let motorExists = await prisma.vehiculo.findUnique({
          where: { motor: value },
        });
        if (motorExists && motorExists.patente !== req.body.patente)
          throw new Error("El motor ya existe en otro vehículo");
      }
      return true;
    }),
  check("id_marca")
    .optional()
    .isInt()
    .withMessage("El ID de la marca debe ser un número entero")
    .custom(async (value) => {
      if (value) {
        if (value <= 0)
          throw new Error(
            "El ID de la marca debe ser un número entero positivo",
          );
        let marcaExists = await prisma.marca.findUnique({
          where: { id: parseInt(value) },
        });
        if (!marcaExists) throw new Error("La marca no existe");
      }
      return true;
    }),
];

export const vehiculoDeleteValidation = [
  check("patente")
    .notEmpty()
    .withMessage("La patente es obligatoria")
    .custom(async (value) => {
      let vehiculoExists = await prisma.vehiculo.findUnique({
        where: { patente: value },
      });
      if (!vehiculoExists) throw new Error("El vehículo no existe");
      return true;
    }),
];
