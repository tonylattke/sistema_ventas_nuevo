steal(
    MODELS+'producto.js',
    CONTROLLERS+'panel_lateral',
    CONTROLLERS+'inventario/listado_productos',
    CONTROLLERS+'inventario/compra'

).then(
    './css/style.css',
    './views/init.ejs',

function($) {

$.Controller("ventana.Inventario",
/** @Static */ {
    pluginName : "ventana_inventario"

}, /** @Prototype */ {
    panel : null,
    titulo: null,
    ver_inventario: null,
    ver_compra : null,

    init : function() {
        this.element.html($.View(CONTROLLERS + 'inventario/inventario/views/init.ejs'));
        
        this.panel = new PanelLateral($("#panel_izquierdo"));

        this.titulo = this.panel.agregar_titulo("Cargando...");

        this.ver_inventario = this.panel.agregar_boton("Ver Inventario", this.proxy('abrir_listado_productos'));
        this.ver_compra     = this.panel.agregar_boton("Añadir compra de inventario", this.proxy('abrir_compra'));
        this.panel.agregar_boton("Modificar precio", function() { alert("quieres Modificar precio"); });
		
        this.abrir_listado_productos();
    },

    //FIXME: Se esta repitiendo codigo, encapsular
    abrir_listado_productos : function() {
        var controller = $("#vista").controller();
        if(controller) controller.destroy();
        
        this.titulo.text("Lista de Productos");
        this.ver_inventario.hide();
        this.ver_compra.show();

        $("#vista").inventario_listado_productos();
    },

    abrir_compra : function() {
        var controller = $("#vista").controller();
        if(controller) controller.destroy();

        this.titulo.text("Compra de Inventario");
        this.ver_inventario.show();
        this.ver_compra.hide();

        $("#vista").inventario_compra();
    }
});

});