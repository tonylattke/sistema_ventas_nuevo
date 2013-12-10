steal(
    MODELS+'producto.js',
    MODELS+'combo.js'
).then(
    './css/style.css',
    './views/init.ejs',

function($) {



$.Controller("ventana.ventas.Top",
/** @Static */ {
    pluginName : "ventas_top"

}, /** @Prototype */ {
    
    init : function() {
        this._graficar();
    },

    //Si la lista cambia se vuelve a renderizar
    '{LOCAL.Productos} add' : function(lista, evento, nuevos_items) {
        this._graficar();
    },

    //Se verifica si algun producto se agoto
    '{LOCAL.Productos} updated' : function(lista, evento, item) {
        var cont_productos = this.element.find('.ListaProductosHorizontal');
        //Agotamiento:
        if(item.cantidad === 0) {
            var productos = this.element.find('.producto').models();
            productos.each(function() {
                if(this.id === item.id) {
                    var prod_dom = this.elements(cont_productos),
                        remplazo = LOCAL.Productos.disponibles().slice(9, 10)[0];
                    prod_dom.addClass('agotado');
                    prod_dom.on('webkitTransitionEnd', function() {
                        prod_dom.remove();

                        
                        if(remplazo) {
                            cont_productos.append($.View(
                                CONTROLLERS + 'ventas/ventas/views/producto.ejs',
                                remplazo
                            ));
                        }
                    });

                }
            });
        }
    },

    //Privado:
    _graficar : function() {
        /*
        var salida = [];
        if (LOCAL.Combos != null) {
            salida = LOCAL.Combos.disponibles().slice(0, 10);
        }
        if (salida.length < 10){
            var aux= LOCAL.Productos.disponibles().slice(0, 10 - salida.length);
            salida = salida.concat(aux);
        }
        */
        var salida = LOCAL.Productos.disponibles().slice(0, 10);
        //Primeros combos y productos más vendidos:
        this.element.html($.View(
            CONTROLLERS + 'ventas/top/views/init.ejs',
            salida
        ));
    }
});




});