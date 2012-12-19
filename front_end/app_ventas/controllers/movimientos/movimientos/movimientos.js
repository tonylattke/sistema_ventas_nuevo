steal(
    CONTROLLERS+'panel_lateral',
    
    CONTROLLERS+'formulario/formulario',
    CONTROLLERS+'formulario/campo'

).then(
    './css/style.css',
    './views/init.ejs',

function($) {

$.Controller("ventana.Movimientos",
/** @Static */ {
    pluginName : "ventana_movimientos"

}, /** @Prototype */ {

    panel 								: null,
    titulo								: null,
    intervalo_movimientos				: null,
    intervalo_movimientos_nuevo_form	: null,
    intervalo_movimientos_form_campos	: null,
    crear_movimientos					: null,
    crear_movimientos_nuevo_form		: null,
	crear_movimientos_form_campos		: null,
	
    init : function() {
        this.element.html($.View(CONTROLLERS + 'movimientos/movimientos/views/init.ejs'));

        this.panel = new PanelLateral($("#panel_izquierdo"));

        this.titulo = this.panel.agregar_titulo("Movimientos");
		
		this.intervalo_movimientos = this.panel.agregar_subpanel("intervalo_movimientos_formulario");

		this.intervalo_movimientos_nuevo_form = new Formulario($("#intervalo_movimientos_formulario"));
		this.intervalo_movimientos_nuevo_form.insertar_titulo("Intervalo de movimientos");
		this.intervalo_movimientos_nuevo_form.iniciar("form_intervalo_movimientos","accion_mostrar_movimientos");
		
		this.intervalo_movimientos_form_campos = new Campo($("#form_intervalo_movimientos"));
		this.intervalo_movimientos_form_campos.agregar_texto_simple_limpio("Desde","desde",{});
		this.intervalo_movimientos_form_campos.agregar_texto_simple_limpio("Hasta","hasta",{});
		
		this.intervalo_movimientos_form_campos.agregar_accion("Mostrar");
		
		this.crear_movimientos = this.panel.agregar_subpanel("crear_movimiento_formulario");

		this.crear_movimientos_nuevo_form = new Formulario($("#crear_movimiento_formulario"));
		this.crear_movimientos_nuevo_form.insertar_titulo("Generar nuevo movimiento");
		this.crear_movimientos_nuevo_form.iniciar("form_crear_movimiento","accion_crear_movimiento");
		
		this.crear_movimientos_form_campos = new Campo($("#form_crear_movimiento"));
		var opciones_precio =  [
									{
										"valor": "Z",
										"texto": "Egreso"
									},
									{
										"valor": "I",
										"texto": "Ingreso"
									}
								];
		this.crear_movimientos_form_campos.agregar_selector_limpio("Tipo","prueba4", opciones_precio, {});
		this.crear_movimientos_form_campos.agregar_area_texto_limpio("Motivo","prueba5",3,27,{});
		this.crear_movimientos_form_campos.agregar_accion("Agregar");
    }
});

});
