steal(
    'jquery/controller',
    'SistemaVentas/controllers/ventas'
).then(
function() {
    
    $.Controller("Routing",
    /** @Static */ {
        
    }, /** @Prototype */ {
        
        init : function() {
            $("body").ventana_ventas();
        }
    });

    new Routing($("body"));
});
