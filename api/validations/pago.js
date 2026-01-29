import { check } from "express-validator";
import prisma from "../db.js";

export const pagoCreateValidation = [
  check("importe")
    .notEmpty()
    .withMessage("El importe es obligatorio")
    .isFloat({ gt: 0 })
    .withMessage("El importe debe ser un número decimal positivo"),
  check("observacion")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La observación no puede exceder los 255 caracteres"),
  check("id_empleado")
    .notEmpty()
    .withMessage("El ID del empleado es obligatorio")
    .isInt()
    .withMessage("El ID del empleado debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID del empleado debe ser un número entero positivo",
        );
      }
      let empleadoExists = await prisma.empleado.findUnique({
        where: { id: parseInt(value) },
      });
      if (!empleadoExists) {
        throw new Error("El empleado no existe");
      }
      return true;
    }),
  check("id_poliza")
    .notEmpty()
    .withMessage("El ID de la póliza es obligatorio")
    .isString()
    .withMessage("El ID de la póliza debe ser una cadena de texto")
    .custom(async (value) => {
      let polizaExists = await prisma.poliza.findUnique({
        where: { numero: value },
      });
      if (!polizaExists) {
        throw new Error("La póliza no existe");
      }
      return true;
    }),
  check("id_metodo")
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

export const pagoUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del pago es obligatorio")
    .isInt()
    .withMessage("El ID del pago debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID del pago debe ser un número entero positivo");
      }
      let pagoExists = await prisma.pago.findUnique({
        where: { id: parseInt(value) },
      });
      if (!pagoExists) {
        throw new Error("El pago no existe");
      }
      return true;
    }),
  check("importe")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("El importe debe ser un número decimal positivo"),
  check("observacion")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La observación no puede exceder los 255 caracteres"),
  check("id_empleado")
    .optional()
    .isInt()
    .withMessage("El ID del empleado debe ser un número entero")
    .custom(async (value) => {
      if (value) {
        if (value <= 0) {
          throw new Error(
            "El ID del empleado debe ser un número entero positivo",
          );
        }
        let empleadoExists = await prisma.empleado.findUnique({
          where: { id: parseInt(value) },
        });
        if (!empleadoExists) {
          throw new Error("El empleado no existe");
        }
      }
      return true;
    }),
  check("id_poliza")
    .optional()
    .isString()
    .withMessage("El ID de la póliza debe ser una cadena de texto")
    .custom(async (value) => {
      if (value) {
        let polizaExists = await prisma.poliza.findUnique({
          where: { numero: value },
        });
        if (!polizaExists) {
          throw new Error("La póliza no existe");
        }
      }
      return true;
    }),
  check("id_metodo")
    .optional()
    .isInt()
    .withMessage("El ID del método debe ser un número entero")
    .custom(async (value) => {
      if (value) {
        if (value <= 0) {
          throw new Error(
            "El ID del método debe ser un número entero positivo",
          );
        }
        let metodoExists = await prisma.metodo.findUnique({
          where: { id: parseInt(value) },
        });
        if (!metodoExists) {
          throw new Error("El método no existe");
        }
      }
      return true;
    }),
];

export const pagoDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del pago es obligatorio")
    .isInt()
    .withMessage("El ID del pago debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID del pago debe ser un número entero positivo");
      }
      let pagoExists = await prisma.pago.findUnique({
        where: { id: parseInt(value) },
      });
      if (!pagoExists) {
        throw new Error("El pago no existe");
      }
      return true;
    }),
];
