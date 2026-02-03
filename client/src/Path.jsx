const path = {};

path.admin = [
    {
        "usuarios": [
            {
                "path": "/admin/usuarios/listado",
                "alias": "listado",
            },
            {
                "path": "/admin/usuarios/nuevo",
                "alias": "nuevo",
                "method": "get"
            },
            {
                "path": "/admin/usuarios/detalle/:id",
                "alias": "detalle",
                "method": "get"
            },
            {
                "path": "/admin/usuarios/editar/:id",
                "alias": "editar",
                "method": "get"
            },
            {
                "path": "/admin/usuarios/confirmar/:id",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/admin/usuarios/actualizar/:id",
                "alias": "actualizar",
                "method": "post"
            },
            {
                "path": "/admin/usuarios/eliminar/:id",
                "alias": "eliminar",
                "method": "post"
            }
        ]
    },
    {
        "empresas": [
            {
                "path": "/admin/empresas/listado",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/admin/empresas/nueva",
                "alias": "nuevo",
                "method": "get"
            },
            {
                "path": "/admin/empresas/detalle/:id",
                "alias": "detalle",
                "method": "get"
            },
            {
                "path": "/admin/empresas/editar/:id",
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
                "path": "/admin/coberturas/listado",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/admin/coberturas/nueva",
                "alias": "nueva",
                "method": "get"
            },
            {
                "path": "/admin/coberturas/editar/:id",
                "alias": "editar",
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
                "path": "/admin/polizas/nueva",
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
        "pagos": [
            {
                "path": "/admin/pagos/detalle/:id",
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
                "path": "/admin/caja/listado",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/admin/caja/ingresos",
                "alias": "ingresos",
                "method": "get"
            },
            {
                "path": "/admin/caja/egresos",
                "alias": "egresos",
                "method": "get"
            },
            {
                "path": "/guardar",
                "alias": "guardar",
                "method": "post"
            },
            {
                "path": "/admin/caja/resumen",
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
                "path": "/admin/actividades/listado",
                "alias": "listado",
                "method": "get"
            },
            {
                "path": "/admin/actividades/datos   ",
                "alias": "datos",
                "method": "get"
            }
        ]
    },
    {
        "auxiliares": [
            {
                "path": "/admin/auxiliares/listado",
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
    }

];
path.propietario = [
];
path.supervisor = [
];
path.empleado = [
];

export default path;