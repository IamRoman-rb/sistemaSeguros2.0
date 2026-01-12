import { check } from "express-validator";
import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();
export const actividadCreationValidation = [
  check("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ max: 255 })
    .withMessage("La descripción no puede exceder los 255 caracteres"),
  check("id_empleado")
    .notEmpty()
    .withMessage("El ID del empleado es obligatorio")
    .isInt()
    .withMessage("El ID del empleado debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID del empleado debe ser un número entero positivo"
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
  check("id_tipo_actividad")
    .notEmpty()
    .withMessage("El ID del tipo de actividad es obligatorio")
    .isInt()
    .withMessage("El ID del tipo de actividad debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID del tipo de actividad debe ser un número entero positivo"
        );
      }
      let tipoActividadExists = await prisma.tipo_actividad.findUnique({
        where: { id: parseInt(value) },
      });
      if (!tipoActividadExists) {
        throw new Error("El tipo de actividad no existe");
      }
      return true;
    }),
];

export const actividadUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la actividad es obligatorio")
    .isInt()
    .withMessage("El ID de la actividad debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la actividad debe ser un número entero positivo"
        );
      }
      let actividadExists = await prisma.actividad.findUnique({
        where: { id: parseInt(value) },
      });
      if (!actividadExists) {
        throw new Error("La actividad no existe");
      }
      return true;
    }),
  check("descripcion")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La descripción no puede exceder los 255 caracteres"),
  check("id_empleado")
    .optional()
    .isInt()
    .withMessage("El ID del empleado debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID del empleado debe ser un número entero positivo"
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
  check("id_tipo_actividad")
    .optional()
    .isInt()
    .withMessage("El ID del tipo de actividad debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID del tipo de actividad debe ser un número entero positivo"
        );
      }
      let tipoActividadExists = await prisma.tipo_actividad.findUnique({
        where: { id: parseInt(value) },
      });
      if (!tipoActividadExists) {
        throw new Error("El tipo de actividad no existe");
      }
      return true;
    }),
];
export const actividadDeletionValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la actividad es obligatorio")
    .isInt()
    .withMessage("El ID de la actividad debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la actividad debe ser un número entero positivo"
        );
      }
      let actividadExists = await prisma.actividad.findUnique({
        where: { id: parseInt(value) },
      });
      if (!actividadExists) {
        throw new Error("La actividad no existe");
      }
      return true;
    }),
];
