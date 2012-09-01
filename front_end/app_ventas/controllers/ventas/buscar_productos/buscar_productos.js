steal(
).then(
    './css/style.css',
    './views/init.ejs',

function($) {



$.Controller("ventana.ventas.BuscarProductos",
/** @Static */ {
    pluginName : "ventas_buscar_productos"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html(
            $.View(CONTROLLERS + 'ventas/buscar_productos/views/init.ejs')
        );
    }
});




});