steal(
    'jquery/controller/route',

    CONTROLLERS+'ventas/ventas',
    CONTROLLERS+'area_perfil',
    
    MODELS+'perfil.js',

    LISTAS+'todas.js',

function($) {

$.Controller("Routing",
    /** @Static */ {
    }, /** @Prototype */ {
        
        init : function() {

            LOCAL = {
                Productos         : new Producto.List(),
                Clientes          : null,
                MovimientosCaja   : null,
                MovimientosVenta  : null,
                ComprasInventario : null
            };

            //Cargando el cache local:
            $.when(
                Perfil.yo(),
                LOCAL.Productos.findAll()
                //Los que faltan...

            ).then(
                //Exito:
                //http://images3.wikia.nocookie.net/es.warhammer40k/images/a/ab/Exito_meme.jpg
                function(perfil, productos /* los que faltan */) {
                    //Perfil:
                    LOCAL.Perfil = perfil[0];
                    $('body').area_perfil( LOCAL.Perfil );

                    //Productos:
                    //Clientes:

                    //Los que faltan...
                },
                //Error:
                error
            );
    
        },

        //Eventos de DOM:
        ".logout click" : function() {
            window.location.href = '_logout/';
        },

        '#menu li click' : function(el, ev) {
            //El elemento li en el id tiene el nombre de la ventana a abrir
            $.route.attr('ventana', el.attr('id'));
        },

        //Eventos de URL Hash:
        "route" : function() {
            //Si el hash esta vacio direcciona a ventas:
            $.route.attr('ventana', 'ventas');
        },

        "/:ventana route" : function(data) {
            //Se siguio la convencion de plugin de controlador ventana_<nombre>
            // para automatizar este proceso.
            PAGE['ventana_'+data.ventana]();
        }
        
        
    });

});