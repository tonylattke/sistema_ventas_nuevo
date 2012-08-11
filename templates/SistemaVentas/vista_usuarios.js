//Contiene funcioens de validacion:
$import("/templates/ventas_app/helpers.js");

$import("/templates/ventas_app/Cliente.js");


function revisar_nuevo_cliente() {
    var cliente    = null,
        nombre     = $("nuevo_cliente_Nombre"),
        cedula     = $("nuevo_cliente_Cedula"),
        carnet     = $("nuevo_cliente_Carnet"),
        saldo      = $("nuevo_cliente_Saldo");
        
    if(nombre.value != "" && isAlphanum(nombre.value))
        if(cedula.value != "" && isNumber(cedula.value))
            if(saldo.value != "" && (isNumber(saldo.value) || isDecimal(saldo.value)) && saldo.value >= 0)
                if(carnet.value != "") {
                    cliente = new Cliente(nombre.value, cedula.value, carnet.value, saldo.value);
                }
           
    return cliente;
}

function agregar() {
    var nuevo_cliente = revisar_nuevo_cliente();
    
    if (nuevo_cliente ==null) {
        alert("Los datos del nuevo cliente no son validos.");
        return;
    }
    
    //Se envia un mensaje de confirmacion del nuevo usuario a agregar:
    var conf = confirm("¿Esta seguro que desea agregar a " +
                nuevo_cliente.get_nombre() + "\n como nuevo usuario?");

    if(conf) $("formulario").submit();
}
