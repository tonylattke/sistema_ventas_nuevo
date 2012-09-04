steal(
    CONTROLLERS+'panel_lateral'

).then(
    './css/style.css',
    './views/init.ejs',

function($) {

$.Controller("ventana.Movimientos",
/** @Static */ {
    pluginName : "ventana_movimientos"

}, /** @Prototype */ {

    panel : null,
    
    init : function() {
        this.element.html($.View(CONTROLLERS + 'movimientos/movimientos/views/init.ejs'));

        this.panel = new PanelLateral($("#panel_izquierdo"));


        this.panel.agregar_titulo("Titulo");

        for(var i = 0; i < 15; i ++) {
            var ev = "Clickeado boton "+i;
            this.panel.agregar_boton("Boton "+i, function() { alert(ev); });
        }
    }
});

});
