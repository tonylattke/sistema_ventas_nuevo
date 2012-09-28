steal(
    MODELS+'producto.js',
    MODELS+'factura.js',
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
            //El carrito se mete entre $([]) para poder capturar sus eventos:
            carrito : $([ new ventana.ventas.Carrito($("#carrito")) ])
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
        this.options.carrito[0].agregar(producto);
    },

    /*
     * El boton de vender
     */
    "#resumen_compra .boton_accion click" : function(el, ev) {
        var area_pago =  $("#area_pago").controllers()[0],
            cliente = area_pago.usuario(),
            carrito = this.options.carrito[0];

        factura = new Factura({
            cliente     : cliente,
            //TODO: enviar solo los ids y el pedido
            ventas      : carrito.productos(),
            movimientos : carrito.movimientos()
        }).save(
            //Exito:
            function() {
                alert('Venta realizada');
                
                this.options.carrito[0].limpiar();
                //TODO: Agregar a lista de facturas
            },
            error
        );


    },

    /*
     * Cuando el carrito se actualiza lanza un evento
     * Entonces se actualiza el precio total.
     */
    "{carrito} ACTUALIZADO" : function(el, ev) {
        var total = this.element.find('#resumen_total');
        total.html(this.options.carrito[0].total());
    },
});

});



