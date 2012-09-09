steal(
    LISTAS+'lista_base.js',
    MODELS+'producto.js',

function() {

/*  
 * @class Producto.List 
 * @inherits ListaBase
 * @parent Listas
 * Lista de Productos.
 */
ListaBase('Producto.List',
/** @Static */{
    findAll : 'GET /producto/get/'
},  /** @Prototype */ {

    /*
    * Busca a los Productos que coincidan con el patron segun su: nombre, precio o descripcion.
    * @param {String} patron Patron por el que se filtraran los Productos.
    * @param {Number} [cantidad=Infinito] Cantidad maxima de resultados.
    * @return {Producto.List} La lista con los resultados.
    */
    buscar : function(patron, cantidad) {
        return this._super(['nombre', 'precio', 'descripcion'], patron, cantidad);
    },

    /*
    * Retorna una nueva lista con los Productos que no están agotados.
    * @return {Producto.List} La lista con los resultados.
    */
    disponibles: function() {
        return this.grep(function(producto, i) {
            return producto.cantidad > 0;
        });
    }
});


});
