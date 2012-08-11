//Class Producto:
var Producto = Class.create({
    
    initialize: function(nombre, precio, inventario, imagen,descripcion,proveedor) {
        this.nombre     = nombre;
        this.precio     = precio;
        this.inventario = inventario;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.proveedor = proveedor;
    }

	/*tomar_precio: function() {
		return this.precio;
	}*/
});
