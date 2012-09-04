steal(
    MODELS+'perfil.js'
).then(
    './views/init.ejs',
    './css/style.css',

function($) {



$.Controller("Area.Perfil",
/** @Static */ {
    pluginName : "area_perfil"

}, /** @Prototype */ {
    
    init : function(el, perfil) {
        this.element.html($.View(
            CONTROLLERS + 'area_perfil/views/init.ejs',
            perfil
        ));
    }
});




});



