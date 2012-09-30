steal(
    LISTAS+'lista_base.js',
    MODELS+'factura.js',

function() {

/*  
 * @class Factura.List 
 * @inherits ListaBase
 * @parent Listas
 * Lista de Factura.
 */
ListaBase('Factura.List',
/** @Static */{
    findAll : 'GET /factura/get/'
},  /** @Prototype */ {
});


});
