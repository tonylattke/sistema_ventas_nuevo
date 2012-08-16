/**
 * @class ProductoPedido: 
 *  Representa la cantidad de unidades de un producto pedido en una compra.
 * 
 * @inherits DisparadorDeEventos
 */
var ProductoPedido = Class.create(DisparadorDeEventos, {
    /**@constructor
     * @param $super ignorar.
     * @param {Producto} producto Producto pedido.
     * @param {Int} cantidad Cantidad de unidades.
     */
    initialize : function($super, /**Producto*/ producto, /**Int*/ cantidad){
        $super();
        //Eventos:
        this.CAMBIO_CANTIDAD = "CAMBIO_CANTIDAD";
        
        //Campos:
        this.cantidad = cantidad;
        this.producto = producto;
        
        //Getter y Setter:
        this.__defineGetter__("total", function(){ return this._cantidad * this.producto.precio; });
        
        
        this.__defineGetter__("nombre", function()   { return this.producto.nombre; });
        this.__defineSetter__("nombre", function(val){ this.producto.nombre = val; });
        
        this.__defineGetter__("inventario", function()   { return this.producto.inventario; });
        this.__defineSetter__("inventario", function(val){ this.producto.inventario = val; });
        
        this.__defineGetter__("precio", function()   { return this.producto.precio; });
        this.__defineSetter__("precio", function(val){ this.producto.precio = val; });
        
        this.__defineGetter__("cantidad", function(){ return this._cantidad; });
        
        this.__defineSetter__("cantidad", 
            function(value){
                if(!(value >= 0)) value = 0;
                if(value > this.inventario) value = this.inventario;
                this._cantidad = value;
                this.dispararEvento(this.CAMBIO_CANTIDAD);
            });
        
        
        
        
    }
});