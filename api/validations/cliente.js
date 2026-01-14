import { check } from "express-validator";
import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();
export const clienteCreationValidation = [
  check("dni")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .isInt()
    .withMessage("El DNI debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El DNI debe ser un número entero positivo");
      }
      let clienteExists = await prisma.cliente.findUnique({
        where: { dni: parseInt(value) },
      });
      if (clienteExists) {
        throw new Error("El cliente con este DNI ya existe");
      }
      return true;
    }),
  check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede exceder los 100 caracteres"),
  check("nacimiento")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser una fecha válida"),
  check("direccion")
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .isLength({ max: 200 })
    .withMessage("La dirección no puede exceder los 200 caracteres"),
  check("telefono")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .isLength({ max: 15 })
    .withMessage("El teléfono no puede exceder los 15 caracteres"),
  check("id_localidad")
    .notEmpty()
    .withMessage("El ID de la localidad es obligatorio")
    .isInt()
    .withMessage("El ID de la localidad debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la localidad debe ser un número entero positivo"
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
export const clienteUpdateValidation = [
  check("dni")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .isInt()
    .withMessage("El DNI debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El DNI debe ser un número entero positivo");
      }
      let clienteExists = await prisma.cliente.findUnique({
        where: { dni: parseInt(value) },
      });
      if (!clienteExists) {
        throw new Error("El cliente con este DNI no existe");
      }
      return true;
    }),
  check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede exceder los 100 caracteres"),
  check("nacimiento")
    .withMessage("La fecha de nacimiento es obligatoria")
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser una fecha válida"),
  check("direccion")
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .isLength({ max: 200 })
    .withMessage("La dirección no puede exceder los 200 caracteres"),
  check("telefono")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .isLength({ max: 15 })
    .withMessage("El teléfono no puede exceder los 15 caracteres"),
  check("id_localidad")
    .withMessage("El ID de la localidad es obligatorio")
    .isInt()
    .withMessage("El ID de la localidad debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la localidad debe ser un número entero positivo"
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

export const clienteDeleteValidation = [
  check("dni")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .isInt()
    .withMessage("El DNI debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El DNI debe ser un número entero positivo");
      }
      let clienteExists = await prisma.cliente.findUnique({
        where: { dni: parseInt(value) },
      });
      if (!clienteExists) {
        throw new Error("El cliente con este DNI no existe");
      }
      return true;
    }),
];
