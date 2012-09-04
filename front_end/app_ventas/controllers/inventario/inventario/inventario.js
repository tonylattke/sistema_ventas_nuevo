steal(
    MODELS+'producto.js',
    CONTROLLERS+'inventario/producto_nuevo'

).then(
    './css/style.css',
    './views/init.ejs',

function($) {

$.Controller("ventana.Inventario",
/** @Static */ {
    pluginName : "ventana_inventario"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(CONTROLLERS + 'inventario/inventario/views/init.ejs'));

        //$("#sub_panel_producto_nuevo").producto_nuevo();
    }
});

});