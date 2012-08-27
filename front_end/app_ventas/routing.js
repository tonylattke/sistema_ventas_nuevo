steal(
    CONTROLLERS+'ventas',
    'jquery/controller/route',

function($) {

$.Controller("Routing",
    /** @Static */ {
        
    }, /** @Prototype */ {
        
        init : function() {
        },

        "route" : function() {
            $.route.attr('ventana', 'ventas');
        },

        "/:ventana route" : function(data) {
            PAGE['ventana_'+data.ventana]();
        },
        

        '#menu li click' : function(el, ev) {
            $.route.attr('ventana', el.attr('id'));
        }
    });

});