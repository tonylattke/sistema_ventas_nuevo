steal(
    MODELS+'producto.js',
    CONTROLLERS+'ventas/top',
    CONTROLLERS+'ventas/buscar_productos',
    CONTROLLERS+'ventas/carrito',
    CONTROLLERS+'ventas/pago'

).then(
    './css/style.css',
    './css/producto.css',
    './views/init.ejs',
    './views/producto.ejs',

function($) {

$.Controller("ventana.Ventas",
/** @Static */ {
    pluginName : "ventana_ventas"

}, /** @Prototype */ {
    _carrito : null,

    init : function() {
        this.element.html($.View(CONTROLLERS + 'ventas/ventas/views/init.ejs'));

        //Agregamos a carrito a this.options
        this.update({
            carrito : new ventana.ventas.Carrito($("#carrito"))
        });
        
        $("#top_ventas").ventas_top();
        $("#area_busqueda").ventas_buscar_productos();
        $("#area_pago").ventas_pago();
    },

    /*
     * Al hacer click en un producto este se agrega al carrito
     */
    ".producto click" : function(el, ev) {
        $('.producto').removeClass('seleccionado');
        el.toggleClass('seleccionado');

        var producto = el.model();
        this.options.carrito.agregar(producto);
    }
});

});



