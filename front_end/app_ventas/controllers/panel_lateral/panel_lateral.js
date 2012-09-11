steal(
    './css/style.css',
    //'./views/init.ejs',
    './views/titulo.ejs',
    './views/boton.ejs',
    './views/subpanel.ejs',

function($) {

$.Controller("PanelLateral",
/** @Static */ {
    pluginName : "panel_lateral"

}, /** @Prototype */ {
    
    init : function() {
        //this.element.html($.View(CONTROLLERS + 'panel_lateral/views/init.ejs'));
    },

    agregar_titulo : function(nombre) {
        var titulo = $( $.View(CONTROLLERS + 'panel_lateral/views/titulo.ejs', nombre) );
        this.element.append(titulo);
        return titulo;
    },

    agregar_boton : function(nombre, func) {
        var boton = $( $.View(CONTROLLERS + 'panel_lateral/views/boton.ejs', nombre) );
        this.element.append(boton);
        if(func) boton.click(func);
        return boton;
    },

    agregar_subpanel : function(div_id) {
    	var subp = $( $.View(CONTROLLERS + 'panel_lateral/views/subpanel.ejs', 
    		{
    			id_form	:div_id
			}));
        this.element.append(subp);
        return subp;
    }
});

});
