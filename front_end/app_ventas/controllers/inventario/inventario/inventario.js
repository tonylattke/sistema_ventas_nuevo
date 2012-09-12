steal(
    MODELS+'producto.js',
    CONTROLLERS+'panel_lateral',
    CONTROLLERS+'contenido_lateral',
    CONTROLLERS+'contenido_lateral/views/init.ejs',
    CONTROLLERS+'inventario/compra',
    CONTROLLERS+'formulario'

).then(
    './css/style.css',
    './views/init.ejs',

function($) {

$.Controller("ventana.Inventario",
/** @Static */ {
    pluginName : "ventana_inventario"

}, /** @Prototype */ {
    panel               : null,
    contenido           : null,
    titulo              : null,
    ver_inventario      : null,
    ver_compra          : null,
    ver_mod_precio      : null,
    producto_nuevo      : null,
    producto_nuevo_form : null,

    init : function() {
        this.element.html($.View(CONTROLLERS + 'inventario/inventario/views/init.ejs'));
        
        this.panel = new PanelLateral($("#panel_izquierdo"));
        
        this.titulo = this.panel.agregar_titulo("Cargando...");
		
		this.producto_nuevo = this.panel.agregar_subpanel("producto_nuevo_formulario");

		this.producto_nuevo_form = new Formulario($("#producto_nuevo_formulario"),"Anadir nuevo producto","form_nuevo_producto","accion_agregar_nuevo");
		this.producto_nuevo_form.agregar_texto_simple_limpio("Prueba","prueba",25,{});
		//this.producto_nuevo_form.terminar();

        this.ver_inventario = this.panel.agregar_boton("Ver Inventario", this.proxy('abrir_listado_productos'))[0];
        this.ver_compra     = this.panel.agregar_boton("Añadir compra de inventario", this.proxy('abrir_compra'))[0];
        this.ver_mod_precio = this.panel.agregar_boton("Modificar precio", this.proxy('abrir_mod_precio'))[0];
        
        this.abrir_listado_productos();
    },

    abrir_menu : function(mostrar_aux, esconder_aux, texto) {
        var controller = $("#vista").controller();
        if(controller) controller.destroy();
        
        $("#vista").html("");

        this.titulo.text(texto);
        $(esconder_aux).hide();
        $(mostrar_aux).show();
   },

    abrir_listado_productos : function() {
        
        this.abrir_menu([this.ver_compra, this.ver_mod_precio], this.ver_inventario, "Lista de Productos");
        
        this.contenido = new ContenidoLateral($("#vista"));
        this.contenido.agregar_listado("inventario", LOCAL.Productos, ["imagen","nombre","proveedor","cantidad","precio"]);
        
    },

    abrir_compra : function() {
        
        this.abrir_menu([this.ver_inventario, this.ver_mod_precio], this.ver_compra, "Lista de Productos");
        
        this.contenido = new ContenidoLateral($("#vista"));
        this.contenido.agregar_titulo("Compra de productos");
    },

    abrir_mod_precio : function() {
        
        this.abrir_menu([this.ver_compra, this.ver_inventario], this.ver_mod_precio, "Modificar Precio");
        
        this.contenido = new ContenidoLateral($("#vista"));
        this.contenido.agregar_titulo("Modificar Precio");
    }
});

});