import { check } from "express-validator";
import prisma from "../db.js";

export const empresaCreateValidation = [
  check("empresa")
    .notEmpty()
    .withMessage("El nombre de la empresa es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El nombre de la empresa no puede exceder los 255 caracteres")
    .custom(async (value) => {
      let empresaExists = await prisma.empresa.findUnique({
        where: { empresa: value },
      });
      if (empresaExists) {
        throw new Error("La empresa ya existe");
      }
      return true;
    }),
];

export const empresaUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la empresa es obligatorio")
    .isInt()
    .withMessage("El ID de la empresa debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la empresa debe ser un número entero positivo",
        );
      }
      let empresaExists = await prisma.empresa.findUnique({
        where: { id: parseInt(value) },
      });
      if (!empresaExists) {
        throw new Error("La empresa no existe");
      }
      return true;
    }),
  check("empresa")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El nombre de la empresa no puede exceder los 255 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        let empresaExists = await prisma.empresa.findUnique({
          where: { empresa: value },
        });
        if (empresaExists && empresaExists.id !== parseInt(req.body.id)) {
          throw new Error("La empresa ya existe");
        }
      }
      return true;
    }),
];

export const empresaDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la empresa es obligatorio")
    .isInt()
    .withMessage("El ID de la empresa debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la empresa debe ser un número entero positivo",
        );
      }
      let empresaExists = await prisma.empresa.findUnique({
        where: { id: parseInt(value) },
      });
      if (!empresaExists) {
        throw new Error("La empresa no existe");
      }
      return true;
    }),
];

export const addCoberturaToEmpresaValidation = [
  check("id_empresa")
    .notEmpty()
    .withMessage("El ID de la empresa es obligatorio")
    .isInt()
    .withMessage("El ID de la empresa debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la empresa debe ser un número entero positivo",
        );
      }
      let empresaExists = await prisma.empresa.findUnique({
        where: { id: parseInt(value) },
      });
      if (!empresaExists) {
        throw new Error("La empresa no existe");
      }
      return true;
    }),
  check("id_cobertura")
    .notEmpty()
    .withMessage("El ID de la cobertura es obligatorio")
    .isInt()
    .withMessage("El ID de la cobertura debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la cobertura debe ser un número entero positivo",
        );
      }
      let coberturaExists = await prisma.cobertura.findUnique({
        where: { id: parseInt(value) },
      });
      if (!coberturaExists) {
        throw new Error("La cobertura no existe");
      }
      return true;
    }),
];

export const removeCoberturaToEmpresaValidation = [
  check("id_empresa")
    .notEmpty()
    .withMessage("El ID de la empresa es obligatorio")
    .isInt()
    .withMessage("El ID de la empresa debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la empresa debe ser un número entero positivo",
        );
      }
      let empresaExists = await prisma.empresa.findUnique({
        where: { id: parseInt(value) },
      });
      if (!empresaExists) {
        throw new Error("La empresa no existe");
      }
      return true;
    }),
  check("id_cobertura")
    .notEmpty()
    .withMessage("El ID de la cobertura es obligatorio")
    .isInt()
    .withMessage("El ID de la cobertura debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error(
          "El ID de la cobertura debe ser un número entero positivo",
        );
      }
      let coberturaExists = await prisma.cobertura.findUnique({
        where: { id: parseInt(value) },
      });
      if (!coberturaExists) {
        throw new Error("La cobertura no existe");
      }
      return true;
    }),
];
