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
        movimientos: 'MovimientoVenta.models'
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
    
    /**
     * Busca un movimiento en la factura.
     * @param {String} tipo el tipo del movimiento, puede ser:
     * 'E': Efectivo, 'S': Saldo, 'R': Recarga.
     **/
    movimiento : function(tipo) {
        var movs = this.movimientos.buscar(['tipo'], tipo, 1);
        if(movs.length === 1) {
            return movs[0];
        } else {
            return null;
        }
    }
});

}
);