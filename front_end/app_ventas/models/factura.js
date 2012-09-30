steal(
    'jquery/model',
    
function() {
   
$.Model('Factura',
/** @Static */ {
    attributes  : {
        id      : 'number',
        fecha   : 'date',
        cliente : 'Cliente.model',

        ventas  : 'VentaProducto.models',
        movimientos: 'Movimiento.models'
    },

    serialize : {
        'VentaProducto.models' : function(ventas, type){
            return JSON.stringify(ventas);
        },

        'Movimiento.models' : function(movimientos, type){
            return JSON.stringify(movimientos);
        },
    },

    
    findAll : 'GET /factura/get/',
    create  : 'POST /factura/post/'
}, /** @Prototype */ {
    
});

}
);