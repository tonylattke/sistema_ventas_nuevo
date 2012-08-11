//Importando archivos de funciones:

//Contiene funcioens de validacion:
$import("/templates/ventas_app/helpers.js");
//Contiene la funcione buscar(event, textArea, div)
$import("/templates/ventas_app/vista_ventas/funciones_busqueda_producto.js");
//Contiene buscar_clientes(event, textArea, div_cedula_ok_id, div_nuevo_cliente_id) 
//       y limpiar_cedula(cedula)
$import("/templates/ventas_app/vista_ventas/funciones_busqueda_cliente.js");
//Contiene:
//          cambio_conf_pago_setted()
//        y cambio_conf_pago(ef_id, sa_id, re_id, rer_id, do_id, dor_id)
$import("/templates/ventas_app/vista_ventas/funciones_configuracion_pago.js");


//Importando clases:
$import("/templates/ventas_app/Eventos.js");
$import("/templates/ventas_app/Producto.js");
$import("/templates/ventas_app/Cliente.js");
$import("/templates/ventas_app/vista_ventas/ProductoPedido.js");
$import("/templates/ventas_app/vista_ventas/ConfPago.js");
$import("/templates/ventas_app/vista_ventas/Compra.js");
$import("/templates/ventas_app/vista_ventas/Carrito.js");

/**Variables globales: 
 * Nota: Algunas son inicializadas en el main() de la pagina con los datos de Django:
 */
var Global = {
    compra         : {},
    carrito        : {},
    lista_productos: {},
    lista_clientes : {},
    cliente_actual : "0",
    context        : "",
    dinero         : new Template('#{monto} Bsf.')
};

function carrito_cambio() {
    $("resumen_total").innerHTML = Global.compra.total;
    $("efectivo_txt").value      = Global.compra.total;
    $("saldo_lbl").innerHTML     = 0;
    $("recarga_lbl").innerHTML   = 0;   
}

/**
 * Captura las teclas precionadas para manejar los shortcuts de la pagina.
 */
function captura_de_tecla_global(event){
    //Shortcuts con Control:
    if(event.ctrlKey)
        switch(event.keyCode) {
        }
    
    //Shortcuts con Alt:
    if(event.altKey) //alert(event.keyCode);
        switch(event.keyCode) {
            case 13 :
                comprar();
                break;
            
            case 67:
                $('cedula_txt').focus();
                break;
            case 69:
                $('efectivo_txt').focus();
                break;
            case 80:
                $('buscar_txt').focus();
                break;
        }
    
}

function comprar() {
    var nombres = [],
        c_p = Global.compra.productos,
        hay_compras = false;
    
    //Se acumulan los nombres de los productos para ser usados en el texto de
    //confirmacion al final.
    for(var prop in c_p) {
        if(c_p.hasOwnProperty(prop)) {
            hay_compras = true;
            nombres.push(c_p[prop].cantidad+" "+prop+"s");
        }
    }
    
    if(!hay_compras) {
        alert("No hay productos en la lista de compra.");
        return;
    }
    
    
    //Se crea el formulario de la compra:
    var form = new Element("FORM", {'method':"POST", 'action':'/sistemacaja/comprar_do'});
    form.innerHTML = Global.context;
    
    //Se agrega la lista de productos de la compra al form por medio de un hiden.
    var desc_productos = [];
    for(var prop in c_p) {
        if(c_p.hasOwnProperty(prop)) {
            desc_productos.push('{"nombre":"'+prop+'","cantidad":'+c_p[prop].cantidad+'}');
        }
    }
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "productos", 'value' : "["+desc_productos.join(',')+"]"}));
        
    
    //Se crea el hiden para enviar la informacion del cliente:
    var hidden = new Element("INPUT",{'type' : 'hiden'});
    
    var nuevo_cliente = revisar_nuevo_cliente();
    var nombre;
    if(Global.cliente_actual == "0" && nuevo_cliente != null ) {
        hidden.name  = "nuevo_cliente";
        hidden.value = "{ 'nombre' : '"+nuevo_cliente.get_nombre()+"', 'cedula' : '"+nuevo_cliente.get_cedula()+"', 'carnet' : '"+nuevo_cliente.get_carnet()+"' }";
        nombre = nuevo_cliente.get_nombre();
    } else {
        hidden.name  = "cliente";
        hidden.value = Global.cliente_actual;
        nombre = Global.lista_clientes[Global.cliente_actual].get_nombre();
    }
    form.insert(hidden);
    
    //Se crea un hiden para la informacion del pago:
    var e = +$("efectivo_txt").value,
        s = +$("saldo_lbl").innerHTML,
        r = +$("recarga_lbl").innerHTML,
        d = +$("donacion_lbl").innerHTML;
        
    
    //Verificaciones de los campos:
    if(isNaN(e)){
        alert("El campo de pago en efectivo no es reconocible.");
        return;
    }
    if(r < 0){
        alert("Este cliente no puede pagar con esta cantidad de saldo.");
        return;
    }
    
    if(hidden.value == 0 && r > 0 ){
        alert("El cliente por defecto no puede recargar saldo.")
        return;
    }
    
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "pago", 
            'value' : "{'efectivo': '"+e+"' , 'saldo': '"+s+"' , 'recarga': '"+r+"' , 'donacion': '"+d+"' }"
        }));
    
    //Se envia un mensaje de confirmacion de la compra:
    var conf = confirm("Esta seguro que desea hacer la venta de " +
                nombres.join(" ,") + "\n al usuario '"+nombre+"' a un costo de: " +
                Global.dinero.evaluate( {monto : Global.compra.total} ));

    if(conf) form.submit();
}

function revisar_nuevo_cliente() {
    var cliente    = null,
        nombre     = $("nuevo_cliente_Nombre"),
        cedula     = $("nuevo_cliente_Cedula").value,
        carnet     = $("nuevo_cliente_Carnet");
        
    if(nombre.value != "" && isAlpha(nombre.value))
        if(cedula != "" && isNumber(cedula))
            if(carnet.value != "") {
                cliente = new Cliente(nombre.value, cedula, carnet.value, 0);
            }
       
    return cliente;
}

function anadir(nombre_producto) {
    Global.carrito.agregar_producto(Global.lista_productos[nombre_producto]);
}