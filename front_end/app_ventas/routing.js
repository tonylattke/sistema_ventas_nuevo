steal(
    CONTROLLERS+'ventas',
    'jquery/controller/route',

function($) {

$.Controller("Routing",
    /** @Static */ {
        
    }, /** @Prototype */ {
        
        init : function() {
        },

        //Eventos de DOM:
        ".logout click" : function() {
            window.location.href = '_logout';
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