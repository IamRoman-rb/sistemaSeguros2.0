import { check } from "express-validator";
import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const coberturaCreateValidation = [
  check("cobertura")
    .notEmpty()
    .withMessage("El nombre de la cobertura es obligatorio")
    .isLength({ max: 255 })
    .withMessage(
      "El nombre de la cobertura no puede exceder los 255 caracteres",
    )
    .custom(async (value) => {
      let coberturaExists = await prisma.cobertura.findUnique({
        where: { cobertura: value },
      });
      if (coberturaExists) {
        throw new Error("La cobertura ya existe");
      }
      return true;
    }),
  check("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
];
export const coberturaUpdateValidation = [
  check("id")
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
  check("cobertura")
    .optional()
    .isLength({ max: 255 })
    .withMessage(
      "El nombre de la cobertura no puede exceder los 255 caracteres",
    )
    .custom(async (value, { req }) => {
      let coberturaExists = await prisma.cobertura.findUnique({
        where: { cobertura: value },
      });
      if (coberturaExists && coberturaExists.id !== parseInt(req.params.id)) {
        throw new Error("La cobertura ya existe");
      }
      return true;
    }),
  check("descripcion")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía"),
];
export const coberturaDeleteValidation = [
  check("id")
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
export const coberturaAddEmpresaValidation = [
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
];
export const coberturaRemoveEmpresaValidation = [
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
];
export const coberturaAddRiesgoValidation = [
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
  check("id_riesgo")
    .notEmpty()
    .withMessage("El ID del riesgo es obligatorio")
    .isInt()
    .withMessage("El ID del riesgo debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID del riesgo debe ser un número entero positivo");
      }
      let riesgoExists = await prisma.riesgo.findUnique({
        where: { id: parseInt(value) },
      });
      if (!riesgoExists) {
        throw new Error("El riesgo no existe");
      }
      return true;
    }),
];
export const coberturaRemoveRiesgoValidation = [
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
  check("id_riesgo")
    .notEmpty()
    .withMessage("El ID del riesgo es obligatorio")
    .isInt()
    .withMessage("El ID del riesgo debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error("El ID del riesgo debe ser un número entero positivo");
      }
      let riesgoExists = await prisma.riesgo.findUnique({
        where: { id: parseInt(value) },
      });
      if (!riesgoExists) {
        throw new Error("El riesgo no existe");
      }
      return true;
    }),
];
export const coberturaAddPolizaValidation = [
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
  check("numero_poliza")
    .notEmpty()
    .withMessage("El número de póliza es obligatorio")
    .custom(async (value) => {
      let polizaExists = await prisma.poliza.findUnique({
        where: { numero: value },
      });
      if (!polizaExists) {
        throw new Error("La póliza no existe");
      }
      return true;
    }),
];
export const coberturaRemovePolizaValidation = [
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
  check("numero_poliza")
    .notEmpty()
    .withMessage("El número de póliza es obligatorio")
    .custom(async (value) => {
      let polizaExists = await prisma.poliza.findUnique({
        where: { numero: value },
      });
      if (!polizaExists) {
        throw new Error("La póliza no existe");
      }
      return true;
    }),
];
