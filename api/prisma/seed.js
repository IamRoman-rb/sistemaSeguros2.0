import prisma from "../db.js";
import { brands, ubicaciones } from "./request.js";
async function main() {
  // Marcas de vehículos
  const brandList = await brands();
  await prisma.marca.createMany({
    data: brandList.map((brand) => ({ marca: brand })),
  });

  // Provincias
  const ubicacionesData = await ubicaciones();
  for (const prov of ubicacionesData) {
    await prisma.provincia.create({
      data: {
        provincia: prov.nombre,
      },
    });
  }

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

  // Roles
  await prisma.rol.createMany({
    data: [
      { rol: "admin" },
      { rol: "propietario" },
      { rol: "supervisor" },
      { rol: "empleado" },
    ],
  });

  // Sucursales
  await prisma.sucursal.createMany({
    data: [
      { sucursal: "Solano" },
      { sucursal: "Calle - Solano" },
      { sucursal: "Las Toninas" },
      { sucursal: "Calle - Las Toninas" },
    ],
  });

  // Tipos de actividad
  await prisma.tipo_actividad.createMany({
    data: [{ tipo: "Crear" }, { tipo: "Editar" }, { tipo: "Borrar" }],
  });

  // Métodos de pago
  await prisma.metodo.createMany({
    data: [{ metodo: "Efectivo" }, { metodo: "Transferencia" }],
  });

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
