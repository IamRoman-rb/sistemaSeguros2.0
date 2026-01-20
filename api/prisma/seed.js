import prisma from "../db.js";

async function main() {
  // Marcas de vehículos
  await prisma.marca.createMany({
    data: [{ marca: "Toyota" }, { marca: "Ford" }, { marca: "Honda" }],
  });

  // Provincias
  await prisma.provincia.createMany({
    data: [
      { provincia: "Buenos Aires" },
      { provincia: "Córdoba" },
      { provincia: "Santa Fe" },
    ],
  });

  // Localidades (dependen de provincia)
  await prisma.localidad.createMany({
    data: [
      { localidad: "La Plata", id_provincia: bsas.id },
      { localidad: "Córdoba Capital", id_provincia: cordoba.id },
    ],
  });

  // Roles
  await prisma.rol.createMany({
    data: [
      { rol: "Administrador" },
      { rol: "Vendedor" },
      { rol: "Supervisor" },
    ],
  });

  // Sucursales
  await prisma.sucursal.createMany({
    data: [{ sucursal: "Sucursal Centro" }, { sucursal: "Sucursal Norte" }],
  });

  // Tipos de actividad
  await prisma.tipo_actividad.createMany({
    data: [{ tipo: "Venta" }, { tipo: "Consulta" }, { tipo: "Mantenimiento" }],
  });

  // Métodos de pago
  await prisma.metodo.createMany({
    data: [
      { metodo: "Efectivo" },
      { metodo: "Tarjeta de Crédito" },
      { metodo: "Transferencia" },
    ],
  });

  // Empresas
  await prisma.empresa.createMany({
    data: [{ empresa: "Empresa A" }, { empresa: "Empresa B" }],
  });

  // Coberturas
  await prisma.cobertura.createMany({
    data: [
      { cobertura: "Cobertura Básica", descripcion: "Cobertura estándar" },
      { cobertura: "Cobertura Premium", descripcion: "Cobertura completa" },
    ],
  });

  // Riesgos
  await prisma.riesgo.createMany({
    data: [
      { riesgo: "Robo" },
      { riesgo: "Accidente" },
      { riesgo: "Daños a terceros" },
    ],
  });

  // Tipos de póliza
  await prisma.tipo_poliza.createMany({
    data: [{ tipo: "Automóvil" }, { tipo: "Hogar" }],
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
