steal(
    MODELS+'cliente.js'
).then(
    './css/style.css',
    './views/init.ejs',

function($) {



$.Controller("ventana.ventas.Pago",
/** @Static */ {
    pluginName : "ventas_pago"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(
            CONTROLLERS + 'ventas/pago/views/init.ejs'
        ));
    }
});




});