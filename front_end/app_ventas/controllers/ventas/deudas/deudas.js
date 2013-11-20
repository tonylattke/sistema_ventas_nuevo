steal(
    MODELS+'venta_producto.js',
    MODELS+'movimiento_venta.js'

).then(
    './css/style.css',
    './views/init.ejs',
    './views/deuda.ejs',

function($) {



$.Controller("ventana.ventas.Deudas",
/** @Static */ {
    pluginName : "deudas_carrito",

    eventos: {
        ACTUALIZADO: 'ACTUALIZADO'
    }

}, /** @Prototype */ {
    
    init : function() {
        this.element.html(
            $.View(CONTROLLERS + 'ventas/deudas/views/init.ejs')
        );
    }
    
});




});