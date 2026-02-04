import prisma from "../db.js";
import {
  brands,
  ubicaciones,
  empresas,
  empresasCoberturas,
  coberturas,
  empleados,
} from "./request.js";
async function main() {
  // Marcas de vehículos
  const brandList = await brands();
  await prisma.marca.createMany({
    data: brandList.map((brand) => ({ marca: brand })),
  });
  console.log("Seed completado para marcas de vehículos");

  // Provincias
  const ubicacionesData = await ubicaciones();
  for (const prov of ubicacionesData) {
    await prisma.provincia.create({
      data: {
        provincia: prov.nombre,
      },
    });
  }
  console.log("Seed completado para provincias");

  // Localidades
  for (const prov of ubicacionesData) {
    const provinciaRecord = await prisma.provincia.findUnique({
      where: { provincia: prov.nombre },
    });
    for (const loc of prov.localidades) {
      await prisma.localidad.create({
        data: {
          localidad: loc,
          id_provincia: provinciaRecord.id,
        },
      });
    }
  }
  console.log("Seed completado para localidades");

  // Coberturas
  const coberturasData = await coberturas();
  await prisma.cobertura.createMany({
    data: coberturasData.map((item) => ({
      cobertura: item.cobertura,
      descripcion: item.descripcion,
    })),
  });
  console.log("Seed completado para coberturas");

  // Empresas
  const empresasData = await empresas();
  await prisma.empresa.createMany({
    data: empresasData.map((item) => ({
      empresa: item.empresa,
    })),
  });
  console.log("Seed completado para empresas");

  // Empresas - Coberturas
  const empresasCoberturasData = await empresasCoberturas();
  for await (const item of empresasCoberturasData) {
    const empresa = await prisma.empresa.findUnique({
      where: { empresa: item.empresa },
    });
    const cobertura = await prisma.cobertura.findUnique({
      where: { cobertura: item.cobertura },
    });
    await prisma.cobertura_empresa.create({
      data: {
        id_empresa: empresa.id,
        id_cobertura: cobertura.id,
      },
    });
  }
  console.log("Seed completado para empresas - coberturas");

  // Roles
  await prisma.rol.createMany({
    data: [
      { rol: "administrador" },
      { rol: "propietario" },
      { rol: "supervisor" },
      { rol: "empleado" },
    ],
  });
  console.log("Seed completado para roles");

  // Sucursales
  await prisma.sucursal.createMany({
    data: [
      { sucursal: "Solano" },
      { sucursal: "Calle Solano" },
      { sucursal: "Las Toninas" },
      { sucursal: "Calle Las Toninas" },
    ],
  });
  console.log("Seed completado para roles y sucursales");

  // Tipos de actividad
  await prisma.tipo_actividad.createMany({
    data: [
      { tipo: "Crear" },
      { tipo: "Editar" },
      { tipo: "Desactivar" },
      { tipo: "Activar" },
    ],
  });
  console.log("Seed completado para tipos de actividad");

  // Métodos de pago
  await prisma.metodo.createMany({
    data: [{ metodo: "Efectivo" }, { metodo: "Transferencia" }],
  });
  console.log("Seed completado para métodos de pago");

  // Empleados
  const empleadosData = await empleados();
  for await (const item of empleadosData) {
    const sucursal = await prisma.sucursal.findUnique({
      where: { sucursal: item.sucursal },
    });
    const rol = await prisma.rol.findUnique({
      where: { rol: item.rol },
    });
    await prisma.empleado.create({
      data: {
        nombre: item.nombre,
        dni: Number(item.dni),
        clave: item.clave,
        id_sucursal: sucursal.id,
        id_rol: rol.id,
      },
    });
  }
  console.log("Seed completado para modelos básicos");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
