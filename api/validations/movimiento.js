import { check } from "express-validator";
import prisma from "../db.js";

export const movimientoCreateValidation = [
  check("es_ingreso")
    .notEmpty()
    .withMessage("El campo es_ingreso es obligatorio")
    .isBoolean()
    .withMessage("El campo es_ingreso debe ser un valor booleano"),
  check("motivo")
    .notEmpty()
    .withMessage("El motivo es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El motivo no puede exceder los 255 caracteres"),
  check("descripcion")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede exceder los 500 caracteres"),
  check("importe")
    .notEmpty()
    .withMessage("El importe es obligatorio")
    .isFloat({ gt: 0 })
    .withMessage("El importe debe ser un número decimal positivo"),
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
];

export const movimientoUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del movimiento es obligatorio")
    .isInt()
    .withMessage("El ID del movimiento debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID del movimiento debe ser un número entero positivo",
        );
      }
      let movimientoExists = await prisma.movimiento.findUnique({
        where: { id: parseInt(value) },
      });
      if (!movimientoExists) {
        throw new Error("El movimiento no existe");
      }
      return true;
    }),
  check("es_ingreso")
    .optional()
    .isBoolean()
    .withMessage("El campo es_ingreso debe ser un valor booleano"),
  check("motivo")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El motivo no puede exceder los 255 caracteres"),
  check("descripcion")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede exceder los 500 caracteres"),
  check("importe")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("El importe debe ser un número decimal positivo"),
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
];

export const movimientoDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del movimiento es obligatorio")
    .isInt()
    .withMessage("El ID del movimiento debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID del movimiento debe ser un número entero positivo",
        );
      }
      let movimientoExists = await prisma.movimiento.findUnique({
        where: { id: parseInt(value) },
      });
      if (!movimientoExists) {
        throw new Error("El movimiento no existe");
      }
      return true;
    }),
];
