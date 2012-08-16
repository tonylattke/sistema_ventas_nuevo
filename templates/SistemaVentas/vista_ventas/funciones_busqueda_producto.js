var hola;

function buscar(event, textArea, div) {
    var texto = $(textArea).value.toLowerCase(),
        div_lista = $(div);
    
    //Si se ha precionado enter:
    if(!event.ctrlKey && event.keyCode == 13 && texto.length != 0) {
        //se busca el primer producto y se agrega al carrito:
        f = div_lista.firstChild.firstChild.onclick;
        f();
    }
    
    div_lista.style.display = 'none';
    
    //Si el texto de busqueda es muy corto habran muchos resultados, afectando la BD:
    if(texto.length < 3) return;

    
    var l_p = Global.lista_productos, resultados,
        primero = true,
        producto, div_base, div_producto, div_foto, div_descripcion;

    
    new Ajax.Request('buscar_productos',
    {
        method:'get',
        parameters: {
            "busqueda":texto
        },
        onSuccess: function(transport){
            if(transport.responseText != null) {
                resultados = transport.responseText.evalJSON();

                div_lista.style.display = 'block';
                div_lista.update("");

                for(var i in resultados) {
                    if(resultados.hasOwnProperty(i)) {
                        producto = new Producto(resultados[i].nombre, resultados[i].precio, resultados[i].inventario, resultados[i].imagen, resultados[i].descripcion, resultados[i].proveedor);
                        l_p[producto.nombre] = producto;


                        //DIV de la foto:
                        div_foto        = new Element("DIV", {'class' : "Producto_foto_horizontal"})
                                                        .insert("<img src= '"+producto.imagen+"' width=\"64px\" heigth=\"64px\"/>");

                        //DIV de la descripcion:
                        div_descripcion = new Element("DIV", {'class' : "Producto_descripcion_horizontal"})
                                                        .insert("<label>"+producto.nombre+"</label><br/><label>"+producto.precio+"Bsf.</label>");

                        //DIV completo:
                        var descripcion = "Nombre: "+producto.nombre+"\nprecio: "+producto.precio+"Bsf.\ncantidad: "+producto.inventario;
                        div_producto    = new Element("DIV",{'title':descripcion}).insert(div_foto).insert(div_descripcion);

                        if(primero) {
                            div_producto.className     = "Producto_seleccionado";
                            primero = false;
                        } else {
                            div_producto.className     = "Producto";
                        }

                        div_producto.onclick =  Function("anadir('"+producto.nombre+"');");

                        //DIV wrapper:
                        div_base        = new Element("DIV", {'class' : "Base"}).insert(div_producto);

                        div_lista.insert(div_base);
                    }
                }

            } else {
                alert("Ocurrio un error en el servidor =s");
            }

        },
        onFailure: function(){
            alert('No se pudo contactar con el servidor, verifique la conexion.')
        }
    });
}
