steal(
    MODELS+'producto.js'
).then(
    './css/style.css',
    './views/init.ejs',

function($) {



$.Controller("ventana.inventario.producto_nuevo",
/** @Static */ {
    pluginName : "inventario_producto_nuevo"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html(
            $.View(CONTROLLERS + 'inventario/producto_nuevo/views/init.ejs')
        );
    },

});




});