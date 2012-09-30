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
    total : null,


    init : function() {
        this.element.html($.View(
            CONTROLLERS + 'ventas/pago/views/init.ejs'
        ));
    },

    /*
     * * Al precionar una tecla en la barra de busqueda se actualizan los resultados.
     */
    "input.buscar keyup" : function(input, ev) {
        var busqueda = LOCAL.Clientes.buscar(input.val(), 1);

        if(busqueda.length > 0) {
            var cliente = busqueda[0];
            this._mostrar_cliente();

            var cliente_div = this.element.find('.cliente');
            cliente_div.model(cliente);
            cliente_div.find('.nombre').text(cliente.nombre);
            cliente_div.find('.cedula').text(cliente.cedula);
            cliente_div.find('.carnet').text(cliente.carnet);
            cliente_div.find('.saldo' ).text(cliente.saldo );
        } else {
            this._esconder_cliente();
        }

        this._actualizar();
    },

    "input#efectivo change" : function(input, ev) {
        this._actualizar();
    },

    act_total : function(total) {
        this.total = total;
        this.element.find("#efectivo").val(total);

        this._actualizar();
    },

    usuario : function() {
        var cliente_dom = this.element.find('.cliente'),
            cliente = null;

        if(cliente_dom.hasClass('escondido')) {
            //TODO: Registrar usuarios
            cliente = new Cliente({id:0, nombre: 'Anonimo', saldo: 0});
        } else {
            cliente = cliente_dom.model();
        }

        return cliente;
    },

    limpiar : function() {
        this._esconder_cliente();
        this.element.find('input').val('');
    },

    _mostrar_cliente : function() {
        this.element.find('.registrar_cliente').addClass('escondido');
        this.element.find('.cliente').removeClass('escondido');
    },

    _esconder_cliente : function() {
        this.element.find('.registrar_cliente').removeClass('escondido');
        this.element.find('.cliente').addClass('escondido');
    },

    _actualizar : function() {
        var efectivo_dom = this.element.find("#efectivo"),
            saldo_dom    = this.element.find("#saldo"),
            recarga_dom  = this.element.find("#recarga"),
            efectivo     = Number(efectivo_dom.val()),
            total        = this.total,
            usuario      = this.usuario();

        //Si el campo de efectivo está vacio o no es un numero:
        if(efectivo === NaN) efectivo = this.total;
        
        if(efectivo > total && usuario.id !== 0) {
            saldo_dom.html(0);
            recarga_dom.html(efectivo - total);

        } else if(efectivo < total && usuario.saldo >= total - efectivo) {
            saldo_dom.html(total - efectivo);
            recarga_dom.html(0);

        } else {
            efectivo_dom.val(total);
            saldo_dom.html(0);
            recarga_dom.html(0);
        }
    }
    //TODO: Verificar el pago con saldo a anonimo
});




});