steal(
	'./views/init.ejs',

function($) {

$.Controller("Formulario",
/** @Static */ {
    pluginName : "formulario"

}, /** @Prototype */ {
    
    init : function(titulo, id_form, t_a) {
        this.element.html($.View(CONTROLLERS + 'formulario/formulario/views/init.ejs',
    		{
    			titulo_subsr	: titulo,
                formulario_id	: id_form,
                titulo_action	: t_a
			}
        ));
    }	
});

});