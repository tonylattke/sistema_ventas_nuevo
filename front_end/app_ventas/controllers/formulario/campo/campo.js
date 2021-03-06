steal(
	'./views/init.ejs',
	'./views/accion.ejs',
	'./views/texto_simple_limpio.ejs',
	'./views/busqueda_archivo_limpio.ejs',
	'./views/selector_limpio.ejs',
	'./views/area_texto_limpio.ejs',

function($) {

$.Controller("Campo",
/** @Static */ {
    pluginName : "campo"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(CONTROLLERS + 'formulario/campo/views/init.ejs',{}));
    },
    
    agregar_accion : function(nombre_accion) {
        var boton = $(
        $.View(CONTROLLERS + 'formulario/campo/views/accion.ejs',
               {
				titulo_accion	: nombre_accion
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
    
    agregar_area_texto_limpio : function(descripcion, parametro_id, filas_t, columnas_t, arreglo_validaciones) {
        var area_texto = $(
        $.View(CONTROLLERS + 'formulario/campo/views/area_texto_limpio.ejs',
               {
                titulo		: descripcion,
                name_id		: parametro_id,
                filas		: filas_t,
                columnas	: columnas_t,
                validaciones: arreglo_validaciones
               }
              ));
        this.element.append(area_texto);
        return area_texto;
    },
    
    agregar_busqueda_archivo_limpio : function(descripcion, parametro_id, arreglo_validaciones) {
        var archivo = $(
        $.View(CONTROLLERS + 'formulario/campo/views/busqueda_archivo_limpio.ejs',
               {
                titulo		: descripcion,
                name_id		: parametro_id,
                validaciones: arreglo_validaciones
               }
              ));
        this.element.append(archivo);
        return archivo;
    },
    
    agregar_selector_limpio : function(descripcion, parametro_id, diccionario_opciones, arreglo_validaciones) {
        var selector = $(
        $.View(CONTROLLERS + 'formulario/campo/views/selector_limpio.ejs',
               {
                titulo		: descripcion,
                name_id		: parametro_id,
                opciones	: diccionario_opciones,
                validaciones: arreglo_validaciones
               }
              ));
        this.element.append(selector);
        return selector;
    }
});

});