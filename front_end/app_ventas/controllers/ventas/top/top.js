steal(
    MODELS+'producto.js'
).then(
    './css/style.css',
    './views/init.ejs',
    './views/producto.ejs',

function($) {



$.Controller("Ventana.Ventas.Top",
/** @Static */ {
    pluginName : "ventas_top"

}, /** @Prototype */ {
    
    init : function() {
        var self = this;
        //Primeros 5 productos más vendidos:
        Producto.findAll('', function(productos) {
            self.element.html($.View(
                CONTROLLERS + 'ventas/top/views/init.ejs',
                productos.slice(0, 6)
            ));
        });
    }
});




});