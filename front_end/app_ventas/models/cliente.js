steal(
    'jquery/model',
    
function() {
   
$.Model('Cliente',
/** @Static */ {
    id : 'cedula',

    attributes  : {
        cedula      : 'number',
        nombre      : 'string',
        carnet      : 'string',
        saldo       : 'number'
    },
    
    findAll : 'GET /cliente/get/'
}, /** @Prototype */ {
    
});

}
);
