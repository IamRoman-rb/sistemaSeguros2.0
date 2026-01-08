const path = {};

path.admin = [
    {
        "usuarios": [
            {
                "path": "/",
                "alias": "listado",
            },
            {
                "path": "/nuevo",
                "alias": "nuevo",
                "method": "get"
            },
            {
                "path": "/detalle/:id",
                "alias": "detalle",
                "method": "get"
            },
            {
                "path": "/editar/:id",
                "alias": "editar",
                "method": "get"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/actualizar",
                "alias": "actualizar",
                "method": "post"
            },
            {
                "path": "/eliminar",
                "alias": "eliminar",
                "method": "post"
            }
        ]
    },
    {
        "empresas": [
            {
                "path": "/",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/nuevo",
                "alias": "nuevo",
                "method": "get"
            },
            {
                "path": "/detalle/:id",
                "alias": "detalle",
                "method": "get"
            },
            {
                "path": "/editar/:id",
                "alias": "editar",
                "method": "get"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/actualizar",
                "alias": "actualizar",
                "method": "post"
            },
            {
                "path": "/eliminar",
                "alias": "eliminar",
                "method": "post"
            }
        ]
    },
    {
        "coberturas": [
            {
                "path": "/",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/nueva",
                "alias": "nueva",
                "method": "get"
            },
            {
                "path": "/crear",
                "alias": "crear",
                "method": "post"
            }
        ]
    },
    {
        "clientes": [
            {
                "path": "/admin/clientes/listado",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/admin/clientes/nuevo",
                "alias": "nuevo",
                "method": "get"
            },
            {
                "path": "/detalle/:id",
                "alias": "detalle",
                "method": "get"
            },
            {
                "path": "/editar/:id",
                "alias": "editar",
                "method": "get"
            },
            {
                "path": "/confirmar/:id",
                "alias": "confirmar",
                "method": "get"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/actualizar",
                "alias": "actualizar",
                "method": "post"
            },
            {
                "path": "/eliminar",
                "alias": "eliminar",
                "method": "post"
            }
        ]
    },
    {

        "polizas": [
            {
                "path": "/admin/polizas/listado",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/propuesta/:id",
                "alias": "propuesta",
                "method": "get"
            },
            {
                "path": "/nuevo/:id",
                "alias": "nuevo",
                "method": "get"
            },
            {
                "path": "/detalle/:id",
                "alias": "detalle",
                "method": "get"
            },
            {
                "path": "/editar/:id",
                "alias": "editar",
                "method": "get"
            },
            {
                "path": "/confirmar/:id",
                "alias": "confirmar",
                "method": "get"
            },
            {
                "path": "/renovar/:id",
                "alias": "renovar",
                "method": "get"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/actualizar",
                "alias": "actualizar",
                "method": "post"
            },
            {
                "path": "/eliminar",
                "alias": "eliminar",
                "method": "post"
            }
        ]
    },
    {
        "otros-riesgos": [
            {
                "path": "/",
                "alias": "Otros Riesgos",
                "method": "get"
            },
            {
                "path": "/nuevo/:id",
                "alias": "nuevo",
                "method": "get"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/detalle/:id",
                "alias": "detalle",
                "method": "get"
            },
            {
                "path": "/editar/:id",
                "alias": "editar",
                "method": "get"
            },
            {
                "path": "/confirmar/:id",
                "alias": "confirmar",
                "method": "get"
            },
            {
                "path": "/renovar/:id",
                "alias": "renovar",
                "method": "get"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/actualizar",
                "alias": "actualizar",
                "method": "post"
            },
            {
                "path": "/eliminar",
                "alias": "eliminar",
                "method": "post"
            }
        ]
    },
    {
        "pagos": [
            {
                "path": "/detalle/:id",
                "alias": "detalle",
                "method": "get"
            },
            {
                "path": "/recibo/:id",
                "alias": "recibo",
                "method": "get"
            },
            {
                "path": "/pagar/:id",
                "alias": "pagar",
                "method": "get"
            },
            {
                "path": "/acreditar",
                "alias": "acreditar",
                "method": "post"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/eliminar",
                "alias": "eliminar",
                "method": "post"
            }
        ]
    },
    {
        "caja": [
            {
                "path": "/",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/ingresos",
                "alias": "ingresos",
                "method": "get"
            },
            {
                "path": "/egresos",
                "alias": "egresos",
                "method": "get"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/resumen",
                "alias": "resumen",
                "method": "get"
            },
            {
                "path": "/resumen/detalle/:id",
                "alias": "resumen",
                "method": "get"
            },
            {
                "path": "/confirmar/:id",
                "alias": "confirmar",
                "method": "get"
            },
            {
                "path": "/eliminar",
                "alias": "confirmar",
                "method": "post"
            },
            {
                "path": "/cajaPorDia",
                "alias": "Por Dia",
                "method": "get"
            }
        ]
    },
    {
        "historiales": [
            {
                "path": "/",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/recuperar",
                "alias": "recuperar",
                "method": "post"
            }
        ]
    },
    {
        "actividades": [
            {
                "path": "/",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/datos",
                "alias": "datos",
                "method": "get"
            }
        ]
    },
    {
        "auxiliares": [
            {
                "path": "/",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/nuevo",
                "alias": "nuevo",
                "method": "get"
            },
            {
                "path": "/editar/:id",
                "alias": "editar",
                "method": "get"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/actualizar",
                "alias": "actualizar",
                "method": "post"
            }
        ]
    },
    {
        "fotos": [
            {
                "path": "/",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/cargar",
                "alias": "Cargar",
                "method": "get"
            },
            {
                "path": "/almacenar",
                "alias": "Almacenar",
                "method": "post"
            },
            {
                "path": "/eliminar",
                "alias": "Eliminar",
                "method": "post"
            }
        ]
    },
    {
        "pagos-otros-riesgos": [
            {
                "path": "/detalle/:id",
                "alias": "detalle",
                "method": "get"
            },
            {
                "path": "/recibo/:id",
                "alias": "recibo",
                "method": "get"
            },
            {
                "path": "/pagar/:id",
                "alias": "pagar",
                "method": "get"
            },
            {
                "path": "/acreditar",
                "alias": "acreditar",
                "method": "post"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/eliminar",
                "alias": "eliminar",
                "method": "post"
            }
        ]
    }

];
path.propietario = [
];
path.supervisor = [
];
path.empleado = [
];

export default path;