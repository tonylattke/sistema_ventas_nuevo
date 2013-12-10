steal(
    LISTAS+'lista_base.js',
    MODELS+'combo.js',

function() {

/*  
 * @class Combo.List 
 * @inherits ListaBase
 * @parent Listas
 * Lista de Combos.
 */
ListaBase('Combo.List',
/** @Static */{
    findAll : 'GET /combo/get/'
},  /** @Prototype */ {

    /*
    * Busca a los Combos que coincidan con el patron segun su nombre.
    * @param {String} patron Patron por el que se filtraran los Combos.
    * @param {Number} [cantidad=Infinito] Cantidad maxima de resultados.
    * @return {Combo.List} La lista con los resultados.
    */
    buscar : function(patron, cantidad) {
        return this._super(['nombre'], patron, cantidad);
    },

    /*
    * Retorna una nueva lista con los Combos que no están agotados.
    * @return {Combo.List} La lista con los resultados.
    */
    disponibles: function() {
        return this.grep(function(producto, i) {
            //TO DO Envia todos los combos (hacer una funcion que verifique su disponibilidad)
            return true;
        });
    }
});


});
