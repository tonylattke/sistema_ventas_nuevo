//Contiene funcioens de validacion:
$import("/templates/ventas_app/helpers.js");

$import("/templates/ventas_app/Producto.js");

function revisar_nuevo_producto() {
    var producto    = null,
        nombre      = $("nuevo_producto_nombre"),
        cantidad    = $("nuevo_producto_cantidad"),
        precio      = $("nuevo_producto_precio"),
        imagen      = $("examinar_ruta_imagen");
		descripcion = $("nuevo_producto_descripcion");
		proveedor   = $("nuevo_producto_proveedor");
        
    if(nombre.value != "" && isAlphanum(nombre.value)) {
        if(precio.value != ""&& (isDecimal(precio.value) || isNumber(precio.value))){
            if(cantidad.value != "" && isNumber(cantidad.value)) {
	            if(descripcion.value != "" && isAlphanum(descripcion.value)) {
					if(proveedor.value != "" && isAlphanum(proveedor.value)) {
            	        producto = new Producto(nombre.value,  precio.value, cantidad.value, imagen.value, descripcion.value, proveedor.value);
					}
				}
            }
		}
	}
    return producto;
}

function agregar() {
    var nuevo_producto = revisar_nuevo_producto();

    if (nuevo_producto == null) {
        alert("Los datos del nuevo producto no son validos.");
        return;
    }

    //Se envia un mensaje de confirmacion del nuevo usuario a agregar:
    var conf = confirm("¿Esta seguro que desea agregar a " +
                        nuevo_producto.nombre + "\n como nuevo producto?");

    if(conf) $("formulario").submit();
}
