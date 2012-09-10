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

    /** Direccion de las vistas genericas **/
    VIEWS = 'app_ventas/views/';

    /** Direccion de las listas **/
    LISTAS = 'app_ventas/listas/';

    /** Area donde se renderizaran las pantallas **/
    PAGE = $('#page');

    //Modelos y Listas de modelos guardados en el cache local:
    LOCAL = {
        /** Solo referencial, se inicializan en routing. */
        Perfil            : null,
        Productos         : null,
        Clientes          : null,
        MovimientosCaja   : null,
        MovimientosVenta  : null,
        ComprasInventario : null
    };

    //Mejorar
    error = function(xhr, texto, error) { alert("Error:"+text+", "+error); console.log(xhr); };

})
.then(
    'app_ventas/routing.js',

function($) {

    /** INICIALIZACION; **/
    new Routing(document.body);
});
