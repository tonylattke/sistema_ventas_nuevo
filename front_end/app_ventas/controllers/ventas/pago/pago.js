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

    act_total : function(total) {
        this.total = total;
        this.element.find("#efectivo").val(total);

        this._actualizar();
    },

    //El valor de la recarga
    recarga : function() { return Number(this.element.find("#recarga").html()); },
    
    //El valor de efectivo
    efectivo : function() { return Number(this.element.find("#efectivo").val()); },

    //El valor de saldo
    saldo : function() { return Number(this.element.find("#saldo").html()); },

    //La lista de movimientos al realizar el pago:
    movimientos : function() {
        return [
            new MovimientoVenta({
                tipo : 'E', //Effectivo
                cantidad: this.efectivo()
            }),
            new MovimientoVenta({
                tipo : 'R', //Recarga
                cantidad: this.recarga()
            }),
            new MovimientoVenta({
                tipo : 'S', //Saldo
                cantidad: this.saldo()
            })
        ];
    },

    registrando : function() {
        var registrar_dom = this.element.find('.registrar_cliente');

        return !registrar_dom.hasClass('escondido') 
            && registrar_dom.find('#nombre').val().length > 0;
    },

    cliente : function() {
        var cliente_dom   = this.element.find('.cliente'),
            registrar_dom = this.element.find('.registrar_cliente'),
            cliente       = null;

        if(cliente_dom.hasClass('escondido')) {
            //Se verifica si se esta registrando a un cliente
            if(this.registrando() && 
                    this._verificar_nombre() && this._verificar_cedula() && this._verificar_carnet()) {

                return new Cliente({
                    nombre: registrar_dom.find('#nombre').val(),
                    carnet: registrar_dom.find('#carnet').val(),
                    cedula: registrar_dom.find('#cedula').val(),
                    saldo : 0,
                });

            }

            //De lo contrario se retorna el cliente anonimo:
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

    //Planilla de registro de cliente:

    //Nombre
    ".registrar_cliente input#nombre change" : function(input, ev) {
        if(input.val().length > 0) {
            this._verificar_nombre();
        } else {
            this.element.find('.registrar_cliente input#cedula').val('');
            this.element.find('.registrar_cliente input#carnet').val('');
            this._actualizar();
        }
    },

    //Cedula
    ".registrar_cliente input#cedula change" : function(input, ev) {
        input.val(input.val().replace(/[^0-9]/g, ""));
        this._verificar_cedula();
    },

    //Carnet
    ".registrar_cliente input#carnet change" : function(input, ev) {
        input.val(input.val().replace(/[^0-9]/g, ""));
        this._verificar_carnet();
    },


    //Privado:

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
            cliente      = this.cliente();

        //Si el campo de efectivo está vacio o no es un numero:
        if(efectivo === NaN) efectivo = this.total;
        
        if(efectivo > total && cliente.id !== 0) {
            saldo_dom.html(0);
            recarga_dom.html(efectivo - total);

        } else if(efectivo < total && cliente.saldo >= total - efectivo) {
            saldo_dom.html(total - efectivo);
            recarga_dom.html(0);

        } else {
            efectivo_dom.val(total);
            saldo_dom.html(0);
            recarga_dom.html(0);
        }
    },

    _verificar_nombre : function() {
        var registrar_dom = this.element.find('.registrar_cliente');

        if(registrar_dom.find('#nombre').val().length < 3) {
            alert('El nombre debe tener más de 2 caracteres');
            return false;
        }
        return true;
    },

    _verificar_cedula : function() {
        var registrar_dom = this.element.find('.registrar_cliente');

        if(registrar_dom.find('#cedula').val().length !== 8){
            alert('La cedula debe tener 8 digitos');
            return false;
        }
        return true;
    },

    _verificar_carnet : function() {
        var registrar_dom = this.element.find('.registrar_cliente');

        if(registrar_dom.find('#carnet').val().length !== 7){
            alert('El carnet debe tener 7 digitos.');
            return false;
        }
        return true;
    }
});




});