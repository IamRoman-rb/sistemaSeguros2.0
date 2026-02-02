import { check } from "express-validator";
import prisma from "../db.js";

export const polizaCreateValidation = [
  check("numero")
    .notEmpty()
    .withMessage("El número de póliza es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El número de póliza no puede exceder los 100 caracteres")
    .custom(async (value) => {
      let polizaExists = await prisma.poliza.findUnique({
        where: { numero: value },
      });
      if (polizaExists) {
        throw new Error("La póliza ya existe");
      }
      return true;
    }),
  check("emision")
    .notEmpty()
    .withMessage("La fecha de emisión es obligatoria")
    .isISO8601()
    .withMessage("La fecha de emisión debe ser una fecha válida"),
  check("inicio")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria")
    .isISO8601()
    .withMessage("La fecha de inicio debe ser una fecha válida"),
  check("fin")
    .notEmpty()
    .withMessage("La fecha de fin es obligatoria")
    .isISO8601()
    .withMessage("La fecha de fin debe ser una fecha válida")
    .custom((value, { req }) => {
      if (req.body.inicio && new Date(value) < new Date(req.body.inicio)) {
        throw new Error(
          "La fecha de fin no puede ser anterior a la fecha de inicio",
        );
      }
      return true;
    }),
  check("periodo")
    .notEmpty()
    .withMessage("El periodo es obligatorio")
    .isInt()
    .withMessage("El periodo debe ser un número entero")
    .custom((value) => {
      if (parseInt(value) <= 0)
        throw new Error("El periodo debe ser un número entero positivo");
      return true;
    }),
  check("cuotas")
    .notEmpty()
    .withMessage("Las cuotas son obligatorias")
    .isInt()
    .withMessage("Las cuotas deben ser un número entero")
    .custom((value) => {
      if (parseInt(value) <= 0)
        throw new Error("Las cuotas deben ser un número entero positivo");
      return true;
    }),
  check("premio")
    .notEmpty()
    .withMessage("El premio es obligatorio")
    .isFloat({ gt: 0 })
    .withMessage("El premio debe ser un número decimal positivo"),
  check("valido")
    .optional()
    .isBoolean()
    .withMessage("El campo valido debe ser booleano"),
  check("id_tipo_poliza")
    .notEmpty()
    .withMessage("El ID del tipo de póliza es obligatorio")
    .isInt()
    .withMessage("El ID del tipo de póliza debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID del tipo de póliza debe ser un número entero positivo",
        );
      let tipoExists = await prisma.tipo_poliza.findUnique({
        where: { id: parseInt(value) },
      });
      if (!tipoExists) throw new Error("El tipo de póliza no existe");
      return true;
    }),
  check("id_cliente")
    .notEmpty()
    .withMessage("El ID del cliente es obligatorio")
    .isInt()
    .withMessage("El ID del cliente debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error("El ID del cliente debe ser un número entero positivo");
      let clienteExists = await prisma.cliente.findUnique({
        where: { dni: parseInt(value) },
      });
      if (!clienteExists) throw new Error("El cliente no existe");
      return true;
    }),
  check("id_sucursal")
    .notEmpty()
    .withMessage("El ID de la sucursal es obligatorio")
    .isInt()
    .withMessage("El ID de la sucursal debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID de la sucursal debe ser un número entero positivo",
        );
      let sucursalExists = await prisma.sucursal.findUnique({
        where: { id: parseInt(value) },
      });
      if (!sucursalExists) throw new Error("La sucursal no existe");
      return true;
    }),
  check("id_empleado")
    .notEmpty()
    .withMessage("El ID del empleado es obligatorio")
    .isInt()
    .withMessage("El ID del empleado debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID del empleado debe ser un número entero positivo",
        );
      let empleadoExists = await prisma.empleado.findUnique({
        where: { id: parseInt(value) },
      });
      if (!empleadoExists) throw new Error("El empleado no existe");
      return true;
    }),
];

export const polizaUpdateValidation = [
  check("numero")
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
  check("emision")
    .optional()
    .isISO8601()
    .withMessage("La fecha de emisión debe ser una fecha válida"),
  check("inicio")
    .optional()
    .isISO8601()
    .withMessage("La fecha de inicio debe ser una fecha válida"),
  check("fin")
    .optional()
    .isISO8601()
    .withMessage("La fecha de fin debe ser una fecha válida")
    .custom((value, { req }) => {
      if (req.body.inicio && new Date(value) < new Date(req.body.inicio)) {
        throw new Error(
          "La fecha de fin no puede ser anterior a la fecha de inicio",
        );
      }
      return true;
    }),
  check("periodo")
    .optional()
    .isInt()
    .withMessage("El periodo debe ser un número entero")
    .custom((value) => {
      if (value && parseInt(value) <= 0)
        throw new Error("El periodo debe ser un número entero positivo");
      return true;
    }),
  check("cuotas")
    .optional()
    .isInt()
    .withMessage("Las cuotas deben ser un número entero")
    .custom((value) => {
      if (value && parseInt(value) <= 0)
        throw new Error("Las cuotas deben ser un número entero positivo");
      return true;
    }),
  check("premio")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("El premio debe ser un número decimal positivo"),
  check("valido")
    .optional()
    .isBoolean()
    .withMessage("El campo valido debe ser booleano"),
  check("id_tipo_poliza")
    .optional()
    .isInt()
    .withMessage("El ID del tipo de póliza debe ser un número entero")
    .custom(async (value) => {
      if (value) {
        if (value <= 0)
          throw new Error(
            "El ID del tipo de póliza debe ser un número entero positivo",
          );
        let tipoExists = await prisma.tipo_poliza.findUnique({
          where: { id: parseInt(value) },
        });
        if (!tipoExists) throw new Error("El tipo de póliza no existe");
      }
      return true;
    }),
  check("id_cliente")
    .optional()
    .isInt()
    .withMessage("El ID del cliente debe ser un número entero")
    .custom(async (value) => {
      if (value) {
        if (value <= 0)
          throw new Error(
            "El ID del cliente debe ser un número entero positivo",
          );
        let clienteExists = await prisma.cliente.findUnique({
          where: { dni: parseInt(value) },
        });
        if (!clienteExists) throw new Error("El cliente no existe");
      }
      return true;
    }),
  check("id_sucursal")
    .optional()
    .isInt()
    .withMessage("El ID de la sucursal debe ser un número entero")
    .custom(async (value) => {
      if (value) {
        if (value <= 0)
          throw new Error(
            "El ID de la sucursal debe ser un número entero positivo",
          );
        let sucursalExists = await prisma.sucursal.findUnique({
          where: { id: parseInt(value) },
        });
        if (!sucursalExists) throw new Error("La sucursal no existe");
      }
      return true;
    }),
  check("id_empleado")
    .optional()
    .isInt()
    .withMessage("El ID del empleado debe ser un número entero")
    .custom(async (value) => {
      if (value) {
        if (value <= 0)
          throw new Error(
            "El ID del empleado debe ser un número entero positivo",
          );
        let empleadoExists = await prisma.empleado.findUnique({
          where: { id: parseInt(value) },
        });
        if (!empleadoExists) throw new Error("El empleado no existe");
      }
      return true;
    }),
];

export const polizaDeleteValidation = [
  check("numero")
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

export const tipoPolizaCreateValidation = [
  check("tipo")
    .notEmpty()
    .withMessage("El tipo de póliza es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El tipo de póliza no puede exceder los 255 caracteres")
    .custom(async (value) => {
      let tipoExists = await prisma.tipo_poliza.findUnique({
        where: { tipo: value },
      });
      if (tipoExists) throw new Error("El tipo de póliza ya existe");
      return true;
    }),
];

export const tipoPolizaUpdateValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del tipo de póliza es obligatorio")
    .isInt()
    .withMessage("El ID del tipo de póliza debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID del tipo de póliza debe ser un número entero positivo",
        );
      let tipoExists = await prisma.tipo_poliza.findUnique({
        where: { id: parseInt(value) },
      });
      if (!tipoExists) throw new Error("El tipo de póliza no existe");
      return true;
    }),
  check("tipo")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El tipo de póliza no puede exceder los 255 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        let tipoExists = await prisma.tipo_poliza.findUnique({
          where: { tipo: value },
        });
        if (tipoExists && tipoExists.id !== parseInt(req.body.id))
          throw new Error("El tipo de póliza ya existe");
      }
      return true;
    }),
];

export const tipoPolizaDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID del tipo de póliza es obligatorio")
    .isInt()
    .withMessage("El ID del tipo de póliza debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID del tipo de póliza debe ser un número entero positivo",
        );
      let tipoExists = await prisma.tipo_poliza.findUnique({
        where: { id: parseInt(value) },
      });
      if (!tipoExists) throw new Error("El tipo de póliza no existe");
      return true;
    }),
];

export const polizaVehiculoAddValidation = [
  check("numero_poliza")
    .notEmpty()
    .withMessage("El número de póliza es obligatorio")
    .custom(async (value) => {
      let polizaExists = await prisma.poliza.findUnique({
        where: { numero: value },
      });
      if (!polizaExists) throw new Error("La póliza no existe");
      return true;
    }),
  check("patente_vehiculo")
    .notEmpty()
    .withMessage("La patente del vehículo es obligatoria")
    .custom(async (value, { req }) => {
      let vehiculoExists = await prisma.vehiculo.findUnique({
        where: { patente: value },
      });
      if (!vehiculoExists) throw new Error("El vehículo no existe");
      let relationExists = await prisma.poliza_vehiculo.findFirst({
        where: {
          numero_poliza: req.body.numero_poliza,
          patente_vehiculo: value,
        },
      });
      if (relationExists)
        throw new Error("El vehículo ya está asociado a la póliza");
      return true;
    }),
];

export const polizaVehiculoRemoveValidation = [
  check("numero_poliza")
    .notEmpty()
    .withMessage("El número de póliza es obligatorio")
    .custom(async (value) => {
      let polizaExists = await prisma.poliza.findUnique({
        where: { numero: value },
      });
      if (!polizaExists) throw new Error("La póliza no existe");
      return true;
    }),
  check("patente_vehiculo")
    .notEmpty()
    .withMessage("La patente del vehículo es obligatoria")
    .custom(async (value, { req }) => {
      let vehiculoExists = await prisma.vehiculo.findUnique({
        where: { patente: value },
      });
      if (!vehiculoExists) throw new Error("El vehículo no existe");
      let relationExists = await prisma.poliza_vehiculo.findFirst({
        where: {
          numero_poliza: req.body.numero_poliza,
          patente_vehiculo: value,
        },
      });
      if (!relationExists)
        throw new Error("El vehículo no está asociado a la póliza");
      return true;
    }),
];

export const polizaVehiculoDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la poliza vehiculo es obligatorio")
    .isInt()
    .withMessage("El ID de la poliza vehiculo debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID de la poliza vehiculo debe ser un número entero positivo",
        );
      let exists = await prisma.poliza_vehiculo.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("La relación poliza-vehículo no existe");
      return true;
    }),
];

export const polizaCoberturaDeleteValidation = [
  check("id")
    .notEmpty()
    .withMessage("El ID de la poliza cobertura es obligatorio")
    .isInt()
    .withMessage("El ID de la poliza cobertura debe ser un número entero")
    .custom(async (value) => {
      if (value <= 0)
        throw new Error(
          "El ID de la poliza cobertura debe ser un número entero positivo",
        );
      let exists = await prisma.poliza_cobertura.findUnique({
        where: { id: parseInt(value) },
      });
      if (!exists) throw new Error("La relación poliza-cobertura no existe");
      return true;
    }),
];
