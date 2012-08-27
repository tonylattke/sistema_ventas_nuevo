steal(
    'init.js',

    'jquery/controller',
    'jquery/controller/view',
    'jquery/view/ejs',
function($) {
    ///// VARIABLES GLOBALES /////

    /** Direccion a los controllers **/
    CONTROLLERS = 'app_ventas/controllers/';

    /** Direccion a los modelos **/
    MODELS = 'app_ventas/models/';

    /** Area donde se renderizaran las pantallas **/
    PAGE = $('#page');


})
.then(
    'app_ventas/routing.js',

function($) {

    /** INICIALIZACION; **/
    new Routing($("body"));
});
