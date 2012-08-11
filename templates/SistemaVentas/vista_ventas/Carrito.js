/**@class
 * Clase Carrito
 * clase.
 * @inherits Element
 * @author max
 */
var Carrito = Class.create(DisparadorDeEventos, {
    /**
     * @constructor
     * @param $super ignorar.
     * @param {Compra} compra Referencia a el objeto compra relacionado.
     * @param {Dictionary} plantillas Un diccionario que debe tener como minimo
     * los siguientes templates:
     *    dinero = define como se representa el dinero, con parametro "monto".
     *    --- de momento no hay mas ---.
     * @param {Dictionary} [atributos] Un diccionario definiendo los atributos
     * visuales de la <table> del carrito.
     */
    initialize : function($super, /**Compra*/ compra, /**Dictionary*/ plantillas, /**Dictionary*/ atributos) {
        $super();
        
        this._element = new Element('table', atributos);
        this._plantillas = plantillas;
        
        this.__defineGetter__("element", function(){return this._element;});
        
        this._compra = compra;
        this._entradas = {};
        
        
        
        this._element.insert("<tr><th>Borrar</th><th>Nombre</th> <th>Cantidad</th> <th>Precio</th></tr>");
    },
    
    
    /**
     * @function
     * Agrega un producto al carrito con cierta cantidad de unidades.
     * Al no definir cantidad si el producto no esta en el carrito se agregara 
     * con cantidad 1, si  ya se encuentra se incrementara su cantidad en 1.
     * @param {Producto} producto producto a agregar al carrito.
     * @param {int} [cantidad] cantidad de unidades del producto a agregar.
     * @return {Carrito} este objeto.
     */
    agregar_producto : function(/**String*/ producto, /**int*/ cantidad)/** Carrito*/{
        cantidad = cantidad || 1;
        var entrada_producto = this._entradas[producto.nombre];
        
        if(entrada_producto === undefined) {
            var e = new _Entrada(this, producto, cantidad);
            this._entradas[producto.nombre] = e;
            this._compra.agregar_producto(e._producto_p);
            
            //Observar si se presiona el boton borrar:
            e.observar(e.CLICK_BORRAR, (function(ev){this.eliminar_producto(ev.objeto._producto_p.nombre);}).bindAsEventListener(this));
            //Observar si cambia la cantidad de un producto:
            e.observar(e.CAMBIO_CANTIDAD, (
                function(ev){
                    this._compra.buscar_producto(ev.objeto._producto_p.nombre)
                            .cantidad = ev.objeto._producto_p.cantidad;
                }
            ).bindAsEventListener(this));
             
        } else {
            entrada_producto.cantidad += cantidad;
        }
        
        return this;
    },
    
    /**
     * @function
     * Elimina un producto del carrito.
     * @throws {String} Si no se encuentra el producto.
     * @param {String} nombre_producto nombre del producto a eliminar.
     */
    eliminar_producto : function(/**String*/ nombre_producto){
        var entrada_producto = this._entradas[nombre_producto];
        
        if(entrada_producto === undefined) {
            throw "Producto "+nombre_producto+" no encontrado en el carrito";
        } else {
            this._element.deleteRow(entrada_producto.fila.rowIndex);
            delete this._entradas[nombre_producto];
            this._compra.quitar_producto(nombre_producto);
        }
    },
    
    /**
     * @function
     * Cambia la cantidad de unidades de un producto.
     * @throws {String} Si no se encuentra el producto.
     * @param {int} cantidad nuevo valor de cantidad de unidades del producto.
     * @param {String} nombre_producto nombre del producto a modificar.
     */
    cambiar_cantidad_producto : function(/**String*/ nombre_producto, /**int*/ cantidad){
        var entrada_producto = this._entradas[nombre_producto];
        
        if(entrada_producto === undefined) {
            throw "Producto "+nombre_producto+" no encontrado en el carrito";
        } else {
            entrada_producto.cantidad = cantidad;
        }
    }
});


/** @private */
var _Entrada = Class.create(DisparadorDeEventos, {
    
    /** @constructor */
    initialize : function($super,
                          /** Carrito */ carrito, 
                          /** Producto*/ producto,
                          /** int     */ cantidad         ) {
        $super();
        
        //Eventos:
        this.CLICK_BORRAR    = "CLICK_BORRAR";
        this.CAMBIO_CANTIDAD = "CAMBIO_CANTIDAD";
        
        
        this._carrito    = carrito;
        this._producto_p = new ProductoPedido(producto, 0);
        
        this.__defineGetter__("cantidad" , function (){return this._producto_p.cantidad;});
        this.__defineSetter__("cantidad" , 
            function (val){
                this._producto_p.cantidad = val;
                this._cantidad_txt.value = this._producto_p.cantidad;
                this.dispararEvento(this.CAMBIO_CANTIDAD);
            });
        
        this.fila = this._agregar_fila(this._producto_p, cantidad);
        
        
        this.cantidad = cantidad;
        
    },
    
    /** @private */
    _agregar_fila : function(/**ProductoPedido*/ prod_pedido, /**int*/ cantidad) /** Element(tag:"tr") */{
        var fila = this._carrito._element.insertRow(-1);
        
        var borrar_btn = Element("BUTTON");
        borrar_btn.update("borrar").onclick = (function(e){this.dispararEvento(this.CLICK_BORRAR);}).bindAsEventListener(this);
        fila.insertCell(0).insert(borrar_btn);
        
        fila.insertCell(1).update(prod_pedido.nombre);
        
        this._cantidad_txt = Element("INPUT",{'type':'text', 'size':3, 'value':cantidad});
        this._cantidad_txt.onkeyup = (function(e){this.cantidad = +(e.target.value); }).bindAsEventListener(this);
        fila.insertCell(2).insert(this._cantidad_txt);
        
        fila.insertCell(3).update(this._carrito._plantillas.dinero.evaluate( {monto : prod_pedido.precio} ));
        
        return fila;
    }
});
