steal(
    'jquery/model/list',

function() {
   

/*  
 * @class ListaBase 
 * @inherits $.Model.List
 * @parent Listas
 * Lista generica para almacenar y manejar Modelos.
 */
$.Model.List('ListaBase',
/** @Static */{

}, /** @Prototype */ {

    /*
    * Busca a los Modelos que coincidan con el patron segun los atributos indicados.
    * @param {Array|String} Los atributos por los cuales se hara la busqueda.
    * @param {String} patron Patron por el que se filtraran los Modelos.
    * @param {Number} [cantidad=Infinito] Cantidad maxima de resultados.
    * @return {Producto.List} La lista con los resultados.
    */
    buscar : function(attrs, patron, cantidad) {
        if(!(attrs instanceof Array) ) throw "attrs debe ser un arreglo de Strings";
        if(attrs.length < 1) throw "attrs debe tener por lo menos un elemento";
        if(cantidad === undefined)  cantidad = Number.MAX_VALUE;
        

        var resultado = new this.Class(), //Un objeto de tipo ListaBase o de la clase que lo este heredando
            continua_i = true,
            continua_j = true,
            attr_lc    = null;

        //Si el patron es vacio se retorna la lista vacia.
        if(patron.length < 1)  return resultado;

        patron = patron.toLowerCase();

        //Por cada modelo de la lista:
        this.each(function(i, model) {
            continua_j = true;

            //Por cada atributo del arreglo de atributos:
            attrs.forEach( function(attr, j) {

                //Para busqueda insensible a mayusculas:
                attr_lc = String(model[attr]).toLowerCase();

                //Si el atributo del modelo hace match se guarda y no es necesario probar con el resto.
                if(attr_lc.search(patron) >= 0) {
                    resultado.push(model);
                    continua_j = false;
                }

                return continua_j;
            });

            //Si ya tenemos la cantidad que queriamos no es necesario seguir.
            if(resultado.length >= cantidad) continua_i = false;

            return continua_i;
        });

        //TODO ordenar el arreglo por posicion del patron.search() y hacer slice.

        return resultado;
    }


});



});
