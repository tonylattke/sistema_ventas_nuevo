steal(
	'./views/init.ejs',
	'./views/titulo.ejs',
	'./views/cuerpo.ejs',

function($) {

$.Controller("Formulario",
/** @Static */ {
    pluginName : "formulario"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(CONTROLLERS + 'formulario/formulario/views/init.ejs',
    		{
                
			}
        ));
    },	
    
    iniciar : function(id_form, t_a) {
        var forma = $(
        $.View(CONTROLLERS + 'formulario/formulario/views/cuerpo.ejs',
               {
                formulario_id	: id_form,
                titulo_action	: t_a
               }
              ));
        this.element.append(forma);
        return forma;
    },
    
    insertar_titulo : function(titulo_forma) {
        var titulo = $(
        $.View(CONTROLLERS + 'formulario/formulario/views/titulo.ejs',titulo_forma));
        this.element.append(titulo);
        return titulo;
    }
});

});