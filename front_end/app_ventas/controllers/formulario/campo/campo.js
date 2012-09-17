steal(
	'./views/init.ejs',
	'./views/terminar.ejs',
	'./views/texto_simple_limpio.ejs',
	'./views/busqueda_archivo_limpio.ejs',
	'./views/selector_limpio.ejs',

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
    },
    
    agregar_busqueda_archivo_limpio : function(descripcion, parametro_id, arreglo_validaciones) {
        var texto = $(
        $.View(CONTROLLERS + 'formulario/campo/views/busqueda_archivo_limpio.ejs',
               {
                titulo		: descripcion,
                name_id		: parametro_id,
                validaciones: arreglo_validaciones
               }
              ));
        this.element.append(texto);
        return texto;
    },
    
    agregar_selector_limpio : function(descripcion, parametro_id, diccionario_opciones, arreglo_validaciones) {
        var texto = $(
        $.View(CONTROLLERS + 'formulario/campo/views/selector_limpio.ejs',
               {
                titulo		: descripcion,
                name_id		: parametro_id,
                opciones	: diccionario_opciones,
                validaciones: arreglo_validaciones
               }
              ));
        this.element.append(texto);
        return texto;
    }
});

});