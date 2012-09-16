steal(
	'./views/init.ejs',

function($) {

$.Controller("Campo",
/** @Static */ {
    pluginName : "campo"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(CONTROLLERS + 'campo/campo/views/init.ejs',{}));
    },
    
    terminar : function() {
        var boton = $(
        $.View(CONTROLLERS + 'campo/views/boton_realizar.ejs',
               {
				                
               }
              ));
        this.element.append(boton);
        return boton;
   	},
    
    agregar_texto_simple_limpio : function(descripcion, parametro_id, tam, arreglo_validaciones) {
        var texto = $(
        $.View(CONTROLLERS + 'campo/views/texto_simple_limpio.ejs',
               {
                titulo		: descripcion,
                name_id		: parametro_id,
                tam_campo	: tam,
                validaciones: arreglo_validaciones
               }
              ));
        this.element.append(texto);
        return texto;
    }	
});

});