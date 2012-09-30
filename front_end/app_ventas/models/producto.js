steal(
    'jquery/model',
    
function() {
   
$.Model('Producto',
/** @Static */ {
    attributes  : {
        id          : 'number',
        nombre      : 'string',
        precio      : 'number',
        imagen      : 'string',
        descripcion : 'string',
        proveedor   : 'string',
        cantidad    : 'number'
    },
    
    findAll : 'GET /producto/get/',
}, /** @Prototype */ {

    //Cambia un atributo y fuerza el evento updated:
    cambia_y_actualiza : function(attrs) {
        this.attrs(attrs);
        $([this]).trigger('updated', this);
    }

});

}
);
