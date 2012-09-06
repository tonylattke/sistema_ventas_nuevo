steal(
    './css/style.css',
    './views/titulo.ejs',
    './views/listado.ejs',

function($) {

$.Controller("ContenidoLateral",
/** @Static */ {
    pluginName : "contenido_lateral"

}, /** @Prototype */ {
    
    init : function() {
    	this.element.html($.View(CONTROLLERS + 'contenido_lateral/views/init.ejs'));
    },

    agregar_titulo : function(nombre) {
        var titulo = $( $.View(CONTROLLERS + 'contenido_lateral/views/titulo.ejs', nombre) );
        this.element.append(titulo);
        return titulo;
    },

    agregar_listado : function(nombre_div, lista_objetos, lista_atributos) {
    	var listado = $( 
    		$.View(CONTROLLERS + 'contenido_lateral/views/listado.ejs', 
				   {
				   	nombre		: nombre_div,
				   	objetos		: lista_objetos,
				   	atributos	: lista_atributos
				   }
				  ));
        this.element.append(listado);
        return listado;
    }
});

});
