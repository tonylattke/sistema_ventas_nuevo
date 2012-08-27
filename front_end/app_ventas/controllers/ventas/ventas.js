steal(
    MODELS+'producto.js'
).then(
    './views/init.ejs',

function($) {



$.Controller("Ventana.Ventas",
/** @Static */ {
    pluginName : "ventana_ventas"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(
            CONTROLLERS + 'ventas/views/init.ejs',
            Producto.findAll()
        ));
    }
});




});



