steal(
    MODELS+'producto.js',
    CONTROLLERS+'panel_lateral',
    CONTROLLERS+'inventario/listado_productos'

).then(
    './css/style.css',
    './views/init.ejs',

function($) {

$.Controller("ventana.Inventario",
/** @Static */ {
    pluginName : "ventana_inventario"

}, /** @Prototype */ {
    
    init : function() {
        this.element.html($.View(CONTROLLERS + 'inventario/inventario/views/init.ejs'));
        
        this.panel = new PanelLateral($("#panel_izquierdo"));

        this.panel.agregar_titulo("Lista de Productos");

        this.panel.agregar_boton("Añadir compra de inventario", function() { alert("quieres añadir compra de inventario"); });
        this.panel.agregar_boton("Modificar precio", function() { alert("quieres Modificar precio"); });
		
		$("#area_listado").inventario_listado_productos();
    }
});

});