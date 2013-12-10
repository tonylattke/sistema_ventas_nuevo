steal(
    'jquery/model',
    
function() {
   
$.Model('Combo',
/** @Static */ {
    attributes  : {
        id          : 'number',
        nombre      : 'string',
        precio      : 'number',
        imagen      : 'string',
    },
    
    findAll : 'GET /combo/get/',
}, /** @Prototype */ {

    //Cambia un atributo y fuerza el evento updated:
    cambia_y_actualiza : function(attrs) {
        this.attrs(attrs);
        $([this]).trigger('updated', this);
    }

});

}
);
