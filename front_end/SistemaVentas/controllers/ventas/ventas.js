steal(
    'jquery/controller',
    'jquery/controller/view',
    'jquery/view/ejs',
    'SistemaVentas/models/producto.js'
).then(
function() {
    
    $.Controller("Ventana.Ventas",
    /** @Static */ {
        pluginName : "ventana_ventas"
    }, /** @Prototype */ {
        
        init : function() {
            this.element.html(this.view(
                Producto.findAll()
            ));
        }
    });
});



