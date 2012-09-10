steal(
    MODELS+'venta_producto.js'

).then(
    './css/style.css',
    './views/init.ejs',
    './views/lista.ejs',
    './views/venta.ejs',

function($) {



$.Controller("ventana.ventas.Carrito",
/** @Static */ {
    pluginName : "ventas_carrito"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html(
            $.View(CONTROLLERS + 'ventas/carrito/views/init.ejs')
        );
    },

    agregar : function(producto) {
        //Buscamos una venta asociada a este producto.
        var venta = this.productos().get(producto.id)[0];

        //Si no existe la creamos y la insrtamos:
        if(!venta) {
            venta = new VentaProducto(producto.attrs());
            venta.pedido = 0;

            this.element.find('.compras tbody').append(
                $.View(CONTROLLERS + 'ventas/carrito/views/venta.ejs', venta)
            );
        }

        //Esta funcion actualiza el campo de texto de cantidad
        this._cambiar_pedido(venta, venta.pedido + 1);
    },

    productos : function() {
        return this.element.find('.compras tr').models(VentaProducto);
    },

    //Eventos de DOM:
    '.compras tr input change' : function(el, ev) {
        var pedido = Number( /[0-9]+/.exec(el.val()) ),
            venta = el.closest('tr').model();

        //Si no existe el modelo entonces ignoramos la llamada.
        if(!venta) return false;

        this._cambiar_pedido(venta, pedido);
    },

    '.compras tr button click' : function(el, ev) {
        el.closest('tr').remove();
    },

    'a click' : function(el, ev) {
        this.productos().elements().remove();
    },



    //Privado:
    _cambiar_pedido : function(venta, pedido) {
        if(!pedido) {
            //Esta accion disparara el input change
            venta.elements(this.element).remove();
        } else {
            pedido = Math.min(pedido, venta.cantidad); //Cantidad se refiere al inventario del producto
            venta.pedido = pedido;
            //Actualizando los campos de texto:
            venta.elements(this.element).find('input').val(pedido);
        }

        return pedido;
    }
});




});