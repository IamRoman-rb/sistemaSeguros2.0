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
