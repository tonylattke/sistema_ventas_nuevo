steal(
    'jquery/controller/route',

    CONTROLLERS+'ventas',
    CONTROLLERS+'area_perfil',
    
    MODELS+'perfil.js',

function($) {

$.Controller("Routing",
    /** @Static */ {
        perfil : null
    }, /** @Prototype */ {
        
        init : function() {
            Perfil.yo(
                //Exito
                function(perfil, raw) {
                    Routing.perfil = perfil;
                    $('body').area_perfil(perfil);
                },
                //Error
                error
            );
        },

        //Eventos de DOM:
        ".logout click" : function() {
            window.location.href = '_logout/';
        },

        '#menu li click' : function(el, ev) {
            $.route.attr('ventana', el.attr('id'));
        },

        //Eventos de URL Hash:
        "route" : function() {
            //Si el hash esta vacio direcciona a ventas:
            $.route.attr('ventana', 'ventas');
        },

        "/:ventana route" : function(data) {
            PAGE['ventana_'+data.ventana]();
        }
        
        
    });

});