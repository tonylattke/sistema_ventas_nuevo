steal(
    MODELS+'cliente.js'
).then(
    './css/style.css',
    './views/init.ejs',
    './views/cliente.ejs',
    './views/registrar_cliente.ejs',

function($) {



$.Controller("ventana.ventas.Pago",
/** @Static */ {
    pluginName : "ventas_pago"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(
            CONTROLLERS + 'ventas/pago/views/init.ejs'
        ));
    },

    /*
     * * Al precionar una tecla en la barra de busqueda se actualizan los resultados.
     */
    "input keyup" : function(input, ev) {
        var busqueda = LOCAL.Clientes.buscar(input.val(), 1);

        if(busqueda.length > 0) {
            var cliente = busqueda[0];
            this.element.find('.registrar_cliente').addClass('escondido');
            this.element.find('.cliente').removeClass('escondido');

            var cliente_div = this.element.find('.cliente');
            cliente_div.model(cliente);
            cliente_div.find('.nombre').text(cliente.nombre);
            cliente_div.find('.cedula').text(cliente.cedula);
            cliente_div.find('.carnet').text(cliente.carnet);
            cliente_div.find('.saldo' ).text(cliente.saldo );
        } else {
            this.element.find('.registrar_cliente').removeClass('escondido');
            this.element.find('.cliente').addClass('escondido');
        }
    },


    usuario : function() {
        var cliente_dom = this.element.find('.cliente'),
            cliente = null;

        if(cliente_dom.hasClass('escondido')) {
            cliente = cliente_dom.model();
        } else {
            //TODO: Registrar usuarios
            cliente = new Cliente({id:0, nombre: 'Anonimo'});
        }

        return cliente;
    }

    //TODO: Verificar el pago con saldo a anonimo
});




});