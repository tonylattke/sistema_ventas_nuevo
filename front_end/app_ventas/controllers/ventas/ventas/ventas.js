steal(
    MODELS+'producto.js',
    MODELS+'factura.js',
    CONTROLLERS+'ventas/top',
    CONTROLLERS+'ventas/buscar_productos',
    CONTROLLERS+'ventas/carrito',
    CONTROLLERS+'ventas/pago',
    CONTROLLERS+'ventas/deudas'
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
    _carrito        : null,
    _carrito_deudas : null,

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
        var area_pago =  this.element.find('#area_pago').controllers()[0],
            area_busqueda = this.element.find('#area_busqueda').controllers()[0],
            cliente   = area_pago.cliente(),
            carrito   = this.options.carrito[0],
            productos = carrito.productos(),
            self = this;

        //Si se está registrando pero el usuario es Anonimo no se ha
        //finalizado correctamente el registro.
        if(area_pago.registrando() && cliente.cedula === 0) {
            alert(
                'No ha finalizado correctamente el registro del cliente\n'+
                'Corrija los errores o borre el campo de nombre para vender anonimamente'
            );
            return;
        }

        if(productos.length > 0 || area_pago.recarga() > 0) {

            /* Para saber si es un nuevo cliente no podemos usar isNew() ya que
             * el id del cliente es la cedula y esta ya está establecida.
             */
            var nuevo_cliente = area_pago.registrando();

            factura = new Factura({
                cliente     : cliente,
                //TODO: enviar solo los ids y el pedido
                ventas      : carrito.productos(),
                movimientos : area_pago.movimientos()
            }).save(
                //Exito:
                function(factura) {
                    self.options.carrito[0].limpiar();
                    area_pago.limpiar();
                    area_busqueda.limpiar();


                    /* Cuando se realiza una venta que actualizar todas las listas
                     * que se ven afectadas: reduccion de inventario, nueva factura,
                     * y nuevo usuario o cambio de saldo.
                     */
                    LOCAL.Facturas.push(factura);

                    factura.ventas.each(function() {
                        LOCAL.Productos.get(this.id)[0]
                            .cambia_y_actualiza({
                                cantidad: this.cantidad - this.pedido
                            });
                    });

                    if(nuevo_cliente) {
                        //Agregando al cliente nuevo
                        LOCAL.Clientes.push(factura.cliente);
                        /* Se asume que el servidor (en caso de haber) ya le
                         * agrego el saldo y retornó el modelo con el saldo cambiado.
                         */

                    } else if(cliente.cedula !== 0) {
                        //Modificando el saldo del cliente
                        var l_cliente = LOCAL.Clientes.get(cliente.cedula)[0],
                            recarga = factura.movimiento('R'),
                            saldo   = factura.movimiento('S');

                        if(recarga) {
                            l_cliente.saldo += recarga.cantidad;
                        }

                        if(saldo) {
                            l_cliente.saldo -= saldo.cantidad;
                        }
                    }

                },
                error
            );

        } else {
            alert('No hay productos en el carrito de compra');
        }

    },

    /*
     * Cuando el carrito se actualiza lanza un evento
     * Entonces se actualiza el precio total.
     */
    "{carrito} ACTUALIZADO" : function(el, ev) {
        var total     = this.options.carrito[0].total(),
            total_dom = this.element.find('#resumen_total'),
            area_pago = this.element.find("#area_pago").controllers()[0];

        area_pago.act_total(total);
        total_dom.html(total);
    },
});

});