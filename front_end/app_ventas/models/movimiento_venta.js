steal(
    'jquery/model',
    
function() {
   
$.Model('MovimientoVenta',
/** @Static */ {
    attributes  : {
        id    : 'number',
        tipo  : 'String',
        cantidad: 'number'
    },
    
    findAll : 'GET /movimientoVentas/get/'
}, /** @Prototype */ {
    
});

}
);