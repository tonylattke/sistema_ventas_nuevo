steal(
	'./views/init.ejs',
	'./views/terminar.ejs',
	'./views/texto_simple_limpio.ejs',

function($) {

$.Controller("Campo",
/** @Static */ {
    pluginName : "campo"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(CONTROLLERS + 'formulario/campo/views/init.ejs',{}));
    },
    
    terminar : function() {
        var boton = $(
        $.View(CONTROLLERS + 'formulario/campo/views/terminar.ejs',
               {
				          
               }
              ));
        this.element.append(boton);
        return boton;
   	},
    
    agregar_texto_simple_limpio : function(descripcion, parametro_id, arreglo_validaciones) {
        var texto = $(
        $.View(CONTROLLERS + 'formulario/campo/views/texto_simple_limpio.ejs',
               {
                titulo		: descripcion,
                name_id		: parametro_id,
                validaciones: arreglo_validaciones
               }
              ));
        this.element.append(texto);
        return texto;
    }
});

});