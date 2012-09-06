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
        proveedor   : 'string',
        cantidad    : 'number'
    },
    
    findAll : 'GET /producto/get/'
}, {
    
});

}
);
