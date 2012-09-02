steal(
    'jquery/model/list',

function() {
   
$.Model.List('ListaBase',
/** @Static */{

}, /** @Prototype */ {
    buscar : function(attrs, patron, cantidad) {
        if(!(attrs instanceof Array) ) throw "attrs debe ser un arreglo de Strings";
        if(attrs.lenght < 1) throw "attrs debe tener por lo menos un elemento";

        var resultado = new this.Class(),
            continua_i = true,
            continua_j = true;

        //Por cada modelo de la lista:
        this.each(function(model, i) {
            continua_j = true;

            //Por cada atributo del arreglo de atributos:
            attrs.forEach( function(attr, j) {
                
                //Si el atributo del modelo hace match se guarda y no es necesario probar con el resto.
                if(patron.search(model[attr]) > 0) {
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
    },


});



});
