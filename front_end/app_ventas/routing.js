steal(
    'jquery/controller/route',

    CONTROLLERS+'ventas/ventas',
    CONTROLLERS+'inventario/inventario',
    CONTROLLERS+'movimientos/movimientos',
    CONTROLLERS+'area_perfil',
    
    MODELS+'perfil.js',
    MODELS+'producto.js',
    MODELS+'cliente.js',

    LISTAS+'todas.js',
    
    VIEWS +'todas.js',

function($) {



$.Controller("Routing",
    /** @Static */ {
    }, /** @Prototype */ {
        
        init : function() {
            //Desabilitando el Routing hasta cargar los productos.
            $.route.ready(false);

            //Cargando el cache local:
            $.when(
                Perfil.yo(),
                Producto.findAll(),
                Cliente.findAll(),
                Factura.findAll() //Hay que limitar a las facturas de la semana
                //Los que faltan...

            ).then(
                //Exito:
                //http://images3.wikia.nocookie.net/es.warhammer40k/images/a/ab/Exito_meme.jpg
                function(perfil, productos, clientes, facturas/* los que faltan */) {
                    //Perfil:
                    LOCAL.Perfil = perfil[0];
                    $("#user_profile").area_perfil( LOCAL.Perfil );

                    //Productos:
                    LOCAL.Productos = productos[0];
                    //Clientes:
                    LOCAL.Clientes = clientes[0];
                    //Facturas:
                    LOCAL.Facturas = facturas[0];
                    //Los que faltan...

                    $.route.ready(true);
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
            //Se destruye el controlador anterior.
            var controller = PAGE.controller();
            if(controller) controller.destroy();
            
            //Se siguio la convencion de plugin de controlador ventana_<nombre>
            // para automatizar este proceso.
            PAGE['ventana_'+data.ventana]();
        }
        
        
    });

});