steal(
	'./views/init.ejs',
	'./views/terminar.ejs',
    './views/texto_simple_limpio.ejs',

function($) {

$.Controller("Formulario",
/** @Static */ {
    pluginName : "formulario"

}, /** @Prototype */ {
    
    init : function(titulo, id_form, t_a) {
        this.element.html($.View(CONTROLLERS + 'formulario/views/init.ejs',
    		{
    			titulo_sub		: titulo,
                id_formulario	: id_form,
                titulo_action	: t_a
			}
        ));
    },

	terminar : function() {
        var texto = $(
        $.View(CONTROLLERS + 'formulario/views/terminar.ejs',
               {
				                
               }
              ));
        this.element.append(texto);
        return texto;
   	},
    
    agregar_texto_simple_limpio : function(descripcion, parametro_id, tam, arreglo_validaciones) {
        var texto = $(
        $.View(CONTROLLERS + 'formulario/views/texto_simple_limpio.ejs',
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
