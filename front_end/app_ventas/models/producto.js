steal(
    'jquery/model',
    
function() {
   
$.Model('Producto',
{
    attributes  : {
        id          : 'number',
        nombre      : 'string', 
        precio      : 'number',
        inventario  : 'number',
        imagen      : 'string',
        descripcion : 'string',
        proveedor   : 'string'
    },
    
    findAll : 'GET /producto/get/'
}, {
    
});

}
);
