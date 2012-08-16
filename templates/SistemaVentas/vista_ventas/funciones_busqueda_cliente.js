function buscar_clientes(event, textArea, div_cedula_ok_id, div_nuevo_cliente_id) {
    var texto             = $(textArea).value;
    
    if(texto.length > 1) {
        var l_c   = Global.lista_clientes,
            cliente, resultados;
        

        new Ajax.Request('buscar_usuario',
        {
            method:'get',
            parameters: {
                "busqueda":texto
            },
            onSuccess: function(transport){
                if(transport.responseText != null) {
                    resultados = transport.responseText.evalJSON();
                    
                    if(resultados.length > 0) {
                        cliente = new Cliente(resultados[0].nombre, resultados[0].cedula, resultados[0].carnet, resultados[0].saldo);
                        l_c[cliente.get_cedula()] = cliente;


                        $(div_cedula_ok_id).innerHTML =   "<table border = '0'><tr><td><label>Nombre:</label><br/><label>Cedula:</label><br/><label>Carnet:</label><br/><label>Saldo:</label></td>"+
                                                    "<td><label class='nombre'>"+cliente.get_nombre()+"</label><br/>"+
                                                    "<label>"+cliente.get_cedula()+"</label><br/>"+
                                                    "<label>"+cliente.get_carnet()+"</label><br/>"+
                                                    "<label>"+cliente.get_saldo()+"</label></td></tr></table>";

                        $(div_cedula_ok_id).style.display     = 'block';
                        $(div_nuevo_cliente_id).style.display = 'none';
                        Global.cliente_actual                 = cliente.get_cedula();
                        $("nuevo_cliente_Nombre").value       = "";
                        $("nuevo_cliente_Cedula").value       = "";
                        $("nuevo_cliente_Carnet").value       = "";

                        //Actualiza los campos de configuracion de pago para el cliente encontrado:
                        cambio_conf_pago_setted();
                    }
                } else {
                    alert("Ocurrio un error en el servidor =s");
                }

            },
            onFailure: function(){
                alert('No se pudo contactar con el servidor, verifique la conexion.')
            }
        });

        /*
        for(var cedula in l_c) {
            if(l_c.hasOwnProperty(cedula)) {
                cliente = l_c[cedula];
                if(limpiar_cedula(cedula).search(texto) == 0 || cliente.get_nombre().toLowerCase().search(texto.toLowerCase()) != -1 ) {
                    $(div_cedula_ok_id).innerHTML =   "<table border = '0'><tr><td><label>Nombre:</label><br/><label>Cedula:</label><br/><label>Carnet:</label><br/><label>Saldo:</label></td>"+
                                                "<td><label class='nombre'>"+cliente.get_nombre()+"</label><br/>"+
                                                "<label>"+cedula+"</label><br/>"+
                                                "<label>"+cliente.get_carnet()+"</label><br/>"+
                                                "<label>"+cliente.get_saldo()+"</label></td></tr></table>";
                    
                    $(div_cedula_ok_id).style.display     = 'block';
                    $(div_nuevo_cliente_id).style.display = 'none';
                    Global.cliente_actual                 = cedula;
                    $("nuevo_cliente_Nombre").value       = "";
                    $("nuevo_cliente_Cedula").value       = "";
                    $("nuevo_cliente_Carnet").value       = "";
                    
                    //Actualiza los campos de configuracion de pago para el cliente encontrado:
                    cambio_conf_pago_setted();
                    
                    return;
                }
            }
        }*/
    
    }
    
    $(div_cedula_ok_id).style.display     = 'none';
    $(div_nuevo_cliente_id).style.display = 'block';
    Global.cliente_actual = "0";
}

function limpiar_cedula(cedula){
    if(!isNumber(cedula[0])){
        return cedula.slice(1);
    }
    return cedula;
}
