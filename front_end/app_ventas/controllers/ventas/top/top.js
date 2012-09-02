steal(
    MODELS+'producto.js'
).then(
    './css/style.css',
    './views/init.ejs',
    './views/producto.ejs',

function($) {



$.Controller("ventana.ventas.Top",
/** @Static */ {
    pluginName : "ventas_top"

}, /** @Prototype */ {
    
    init : function() {
        this._graficar();
    },

    //Si la lista cambia se vuelve a renderizar
    '{LOCAL.Productos} add' : function(lista, evento) {
        this._graficar();
    },

    //Privado:
    _graficar : function() {
        //Primeros 10 productos más vendidos:
        this.element.html($.View(
            CONTROLLERS + 'ventas/top/views/init.ejs',
            LOCAL.Productos.slice(0, 10)
        ));
    }
});




});