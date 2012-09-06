steal(
	MODELS+'producto.js'
).then(
    './css/style.css',
    './views/init.ejs',
    './views/producto.ejs',

function($) {



$.Controller("ventana.inventario.ListarProductos",
/** @Static */ {
    pluginName : "inventario_listado_productos"

}, /** @Prototype */ {
    
    init : function(el, options) {
        this.element.html($.View(
            CONTROLLERS + 'inventario/listado_productos/views/init.ejs',
            LOCAL.Productos
        ));
    }
});


});