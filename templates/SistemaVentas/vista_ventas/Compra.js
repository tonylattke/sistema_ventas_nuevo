/**
 * @class
 * Representa una compra de un usuario.
 * @inherits DisparadorDeEventos
 */
var Compra = Class.create(DisparadorDeEventos, {
    /**
     * @constructor
     * @param $super ignorar.
     * @param {ConfPago} [conf_pago] objeto de tipo configuracion de pago.
     * @param {ProductoPedido[]} [productos] lista de objetos ProductoPedido para la compra.
     * @param {Cliente} [cliente] objeto del tipo cliente que es el que hace la compra.
     */
    initialize : function($super,/**ConfPago*/ conf_pago, /**ProductoPedido[]*/ productos , /**Cliente*/ cliente){
        $super();
        //Campos:
        this.conf_pago  = conf_pago || new ConfPago();
        this._productos = productos || [];
        this.cliente    = cliente   || null;
        
        //Eventos:
        this.CAMBIO_PRODUCTOS = "CAMBIO_PRODUCTOS";
        
        this.__defineGetter__("total", 
            function() {
                var r = 0;
                for(var prod in this._productos){
                    if(this._productos.hasOwnProperty(prod)) {
                        r += this._productos[prod].total;
                    }
                }
                return r;
            }
        );
        
        /**@field
         * Arreglo de los ProductoPedido de la compra indexado por los nombres 
         * de los productos.
         */
        this.__defineGetter__("productos", function() { return this._productos; });
        this.__defineSetter__("productos", 
            function(val) {
                this._productos = val;
                this.dispararEvento(this.CAMBIO_PRODUCTOS);
            }
        );
    },
    
    /**@function
     * Agrega un producto a la compra.
     * @param {ProductoPedido} producto Pedido de producto a agregar a la compra.
     * si ya esta este producto se substitulle.
     * @return {Compra} este objeto.
     */
    agregar_producto : function(/**ProductoPedido*/ producto)/** Compra*/{
        this._productos[producto.nombre] = producto;
        var self = this;
        producto.observar(producto.CAMBIO_CANTIDAD, function(e){ self._cambio_en_productos(e); });
        
        this.dispararEvento(this.CAMBIO_PRODUCTOS);
        return this;
    },
    
    /**@function
     * Quita un producto a la compra.
     * Si no se encuentra se arroja una exepcion.
     * @param {String} nombre_producto nombre del pedido a eliminar.
     * @return {Compra} este objeto.
     */
    quitar_producto : function(/**String*/ nombre_producto)/** Compra*/{
        var p = this._productos[nombre_producto];
        if(p === undefined) throw "No existe el producto"+nombre_producto+" en esta compra.";
        delete this._productos[nombre_producto];
        
        this.dispararEvento(this.CAMBIO_PRODUCTOS);
        return this;
    },
    
    /**@function
     * Busca un pedido por el nombre de su producto y lo retorna.
     * @param {String} nombre_producto Nombre del pedido de producto a buscar.
     * @return {ProductoPedido} el pedido si se encontro o null.
     */
    buscar_producto : function(/**String*/ nombre_producto){
        var p = this._productos[nombre_producto];
        if(p === undefined) return null;
        else return p;
    },
    
    
    /** @private */
    _cambio_en_productos : function(){
        this.dispararEvento(this.CAMBIO_PRODUCTOS);
    }
    
});