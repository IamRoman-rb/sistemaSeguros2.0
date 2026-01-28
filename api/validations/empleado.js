import { check } from "express-validator";
import prisma from "../db.js";
import { argon2d } from "argon2";

export const empleadoCreateValidation = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede exceder los 100 caracteres"),
  check("dni")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .isInt()
    .withMessage("El DNI debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El DNI debe ser un número entero positivo");
      }
      let empleadoExists = await prisma.empleado.findUnique({
        where: { dni: parseInt(value) },
      });
      if (empleadoExists) {
        throw new Error("El empleado con este DNI ya existe");
      }
      return true;
    }),
  check("clave")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña no es segura, debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un símbolo",
    ),
  check("id_sucursal")
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
  check("id_rol")
    .notEmpty()
    .withMessage("El ID del rol es obligatorio")
    .isInt()
    .withMessage("El ID del rol debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID del rol debe ser un número entero positivo");
      }
      let rolExists = await prisma.rol.findUnique({
        where: { id: parseInt(value) },
      });
      if (!rolExists) {
        throw new Error("El rol no existe");
      }
      return true;
    }),
];

export const empleadoUpdateValidation = [
  check("id")
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
  check("nombre")
    .optional()
    .isLength({ max: 100 })
    .withMessage("El nombre no puede exceder los 100 caracteres"),
  check("dni")
    .optional()
    .isInt()
    .withMessage("El DNI debe ser un número entero")
    .custom(async (value, { req }) => {
      if (value && value <= 0) {
        throw new Error("El DNI debe ser un número entero positivo");
      }
      if (value) {
        let empleadoExists = await prisma.empleado.findUnique({
          where: { dni: parseInt(value) },
        });
        if (empleadoExists && empleadoExists.id !== parseInt(req.body.id)) {
          throw new Error("El empleado con este DNI ya existe");
        }
      }
      return true;
    }),
  check("clave")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña no es segura, debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un símbolo",
    ),
  check("id_sucursal")
    .optional()
    .isInt()
    .withMessage("El ID de la sucursal debe ser un número entero")
    .custom(async (value) => {
      if (value && value <= 0) {
        throw new Error(
          "El ID de la sucursal debe ser un número entero positivo",
        );
      }
      if (value) {
        let sucursalExists = await prisma.sucursal.findUnique({
          where: { id: parseInt(value) },
        });
        if (!sucursalExists) {
          throw new Error("La sucursal no existe");
        }
      }
      return true;
    }),
  check("id_rol")
    .optional()
    .isInt()
    .withMessage("El ID del rol debe ser un número entero")
    .custom(async (value) => {
      if (value && value <= 0) {
        throw new Error("El ID del rol debe ser un número entero positivo");
      }
      if (value) {
        let rolExists = await prisma.rol.findUnique({
          where: { id: parseInt(value) },
        });
        if (!rolExists) {
          throw new Error("El rol no existe");
        }
      }
      return true;
    }),
];

export const empleadoDeleteValidation = [
  check("id")
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

export const empleadoValidateValidation = [
  check("dni")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .isInt()
    .withMessage("El DNI debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El DNI debe ser un número entero positivo");
      }
      let empleadoExists = await prisma.empleado.findUnique({
        where: { dni: parseInt(value) },
      });
      if (!empleadoExists) {
        throw new Error("El empleado con este DNI no existe");
      }
      return true;
    }),
  check("clave")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña no es segura, debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un símbolo",
    )
    .custom(async (value, { req }) => {
      let empleado = await prisma.empleado.findUnique({
        where: { dni: parseInt(req.body.dni) },
      });
      if (!empleado) {
        throw new Error("El empleado con este DNI no existe");
      }
      if (empleado) {
        const validPassword = await argon2d.verify(empleado.clave, value);
        if (!validPassword) {
          throw new Error("La contraseña es incorrecta");
        }
      }
      return true;
    }),
];
