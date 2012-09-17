steal(
    LISTAS+'lista_base.js',
    MODELS+'cliente.js',

function() {

/*  
 * @class Cliente.List 
 * @inherits ListaBase
 * @parent Listas
 * Lista de Cliente.
 */
ListaBase('Cliente.List',
/** @Static */{
    findAll : 'GET /cliente/get/'
},  /** @Prototype */ {

    /*
    * Busca los clientes cuya cedula coincida con el patron.
    * Nota: El patron de busqueda es limpiado para que solo queden numeros.
    * @param {String} patron Patron por el que se filtraran los Clientes.
    * @param {Number} [cantidad=Infinito] Cantidad maxima de resultados.
    * @return {Cliente.List} La lista con los resultados.
    */
    buscar : function(patron, cantidad) {
        return this._super(['cedula'], patron.replace(/[^0-9]/g, ""), cantidad);
    }
});


});
