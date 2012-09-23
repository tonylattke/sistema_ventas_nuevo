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
		
		this.intervalo_movimientos_form_campos.agregar_accion("Mostar");
		
		
    }
});

});
