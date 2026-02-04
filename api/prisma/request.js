import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import * as argon2 from "argon2";
const file = fileURLToPath(import.meta.url);
const dir = join(dirname(file), "data");

export async function brands() {
  const queryParams = new URLSearchParams({
    limit: "1000",
  });
  const url = `https://carapi.app/api/models/v2?${queryParams.toString()}`;
  const req = await fetch(url);
  const res = await req.json();
  let brandsSet = new Set();
  res.data.forEach((item) => {
    brandsSet.add(item.make);
  });
  return [...brandsSet];
}

export async function ubicaciones() {
  const url = "https://apis.datos.gob.ar/georef/api/provincias";
  const req = await fetch(url);
  const res = await req.json();
  const data = await Promise.all(
    res.provincias.map(async ({ id, nombre }) => {
      const query = new URLSearchParams({
        provincia: id,
        max: "5000",
      });
      const urlLoc = `https://apis.datos.gob.ar/georef/api/localidades?${query.toString()}`;
      const reqLoc = await fetch(urlLoc);
      const resLoc = await reqLoc.json();
      const localidades = resLoc.localidades.map((loc) => loc.nombre);
      return { nombre, localidades };
    }),
  );

  return data;
}

export async function coberturas() {
  const file = await readFile(join(dir, "coberturas.json"), "utf-8");
  const data = JSON.parse(file);
  let result = [];
  for (const item of data) {
    result.push({
      cobertura: item.nombre,
      descripcion: item.descripcion,
    });
  }
  return result;
}

export async function empresas() {
  const file = await readFile(join(dir, "empresas.json"), "utf-8");
  const data = JSON.parse(file);
  let result = [];
  for (const item of data) {
    result.push({
      empresa: item.nombre,
    });
  }
  return result;
}

export async function empresasCoberturas() {
  const fileCoberturas = await readFile(join(dir, "coberturas.json"), "utf-8");
  const fileEmpresas = await readFile(join(dir, "empresas.json"), "utf-8");
  const coberturas = JSON.parse(fileCoberturas);
  const empresas = JSON.parse(fileEmpresas);
  const result = [];
  for (const empresa of empresas) {
    for (const cobertura of empresa.coberturas) {
      result.push({
        empresa: empresa.nombre,
        cobertura: coberturas.find((c) => c.id === cobertura).nombre,
      });
    }
  }

  return result;
}

export async function empleados() {
  const fileUsers = await readFile(join(dir, "usuarios.json"), "utf-8");
  const usuarios = JSON.parse(fileUsers);
  const fileSucursales = await readFile(join(dir, "sucursales.json"), "utf-8");
  const sucursales = JSON.parse(fileSucursales);
  const filePermisos = await readFile(join(dir, "permisos.json"), "utf-8");
  const permisos = JSON.parse(filePermisos);
  let result = [];
  const hashClave = await argon2.hash("SanFrancisco2026!");
  for await (const item of usuarios) {
    result.push({
      nombre: item.nombre,
      dni: Number(item.dni),
      clave: hashClave,
      sucursal: sucursales.find((s) => s.id === item.sucursal).nombre,
      rol:
        permisos
          .find((p) => p.id === item.permisos)
          ?.descripcion.toLowerCase()
          .trim() || "empleado",
    });
  }
  return result;
}
