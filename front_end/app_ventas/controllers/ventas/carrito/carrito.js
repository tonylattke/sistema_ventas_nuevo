steal(
    MODELS+'venta_producto.js',
    MODELS+'movimiento_venta.js'

).then(
    './css/style.css',
    './views/init.ejs',
    './views/lista.ejs',
    './views/venta.ejs',

function($) {



$.Controller("ventana.ventas.Carrito",
/** @Static */ {
    pluginName : "ventas_carrito",

    eventos: {
        ACTUALIZADO: 'ACTUALIZADO'
    }

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

    movimientos : function() {
        return [
            new MovimientoVenta({
                tipo : 'E', //Effectivo
                cantidad: this.total()
            })
        ];
    },

    total : function() {
        var total = 0;
        this.productos().each(function(i, venta){
            total += venta.precio * venta.pedido;
        });
        return total;
    },

    limpiar: function() {
        this.productos().elements().remove();
        this._actualizado();
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
        this._actualizado();
    },

    'a click' : function(el, ev) {
        this.limpiar();
    },



    //Privado:
    _cambiar_pedido : function(venta, pedido) {
        if(!pedido) {
            //Esta accion disparara el input change
            venta.elements(this.element).remove();
        } else {
            pedido = Math.min(pedido, venta.cantidad); //Cantidad se refiere al inventario del producto
            venta.pedido = pedido;
            //Actualizando los campos de texto y precio:
            var els = venta.elements(this.element); 
            els.find('input').val(pedido);
            els.find('.precio').html(pedido * venta.precio + ' Bsf.');
        }
        this._actualizado();

        return pedido;
    },

    _actualizado: function() {
        $([this]).trigger(ventana.ventas.Carrito.eventos.ACTUALIZADO);
    }
});




});