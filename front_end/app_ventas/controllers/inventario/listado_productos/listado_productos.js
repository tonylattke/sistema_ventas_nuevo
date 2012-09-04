steal(
	MODELS+'producto.js'
).then(
    './css/style.css',
    './css/animacion.css',
    './views/init.ejs',
    './views/producto.ejs',

function($) {



$.Controller("ventana.inventario.ListarProductos",
/** @Static */ {
    pluginName : "inventario_listado_productos"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(
            CONTROLLERS + 'inventario/listado_productos/views/init.ejs',
            LOCAL.Productos
        ));
    }
});


});