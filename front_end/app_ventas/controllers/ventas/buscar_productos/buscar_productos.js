steal(
).then(
    './css/style.css',
    './views/init.ejs',
    './views/encontrados.ejs',

function($) {



$.Controller("ventana.ventas.BuscarProductos",
/** @Static */ {
    pluginName : "ventas_buscar_productos"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html(
            $.View(CONTROLLERS + 'ventas/buscar_productos/views/init.ejs')
        );
    },

    /*
     * * Al precionar en la barra de busqueda una tecla se actualizan los resultados.
     */
    "input keyup" : function(input, ev) {
        var encontrados = LOCAL.Productos.buscar(input.val()).disponibles();
        this.element.find("#prod_buscados")
            .html(
                CONTROLLERS + 'ventas/buscar_productos/views/encontrados.ejs',
                encontrados
            );
    },

    /*
     * * Al hacer click en un producto este queda seleccionado.
     */
    ".producto click" : function(el, ev) {
        this.element.find('.producto').removeClass('seleccionado');
        el.toggleClass('seleccionado');
    }
});




});