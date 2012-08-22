from django.shortcuts     import render_to_response, get_object_or_404, redirect
from SistemaVentas.models    import *
from django.db.models     import *
from django.template      import RequestContext
from django.core.urlresolvers       import reverse
from django.contrib.auth.decorators import login_required

#from django.http import Http404
from ast         import literal_eval
from datetime    import datetime
from decimal     import Decimal
from django.utils.datastructures import MultiValueDictKeyError
from django.contrib.auth         import authenticate, login, logout
from datetime    import *

#Librerias para generar pdfs
from django.http import HttpResponse


"""
    El parametro mensaje puede tener los siguientes valores:
        0 : Muestra un mensaje de error al usuario de Clave o Id incorrectos.
        1 : Muestra un mensaje que indica que se ha deslogueado correctamente.
"""
def index(request, mensaje):
    if request.user.is_authenticated():
        return redirect(reverse('SistemaVentas.acounts.views.ver_vender'))
    else:
        diccionario = {'siguiente' : reverse('SistemaVentas.acounts.views.loguear')} #Direccion url de la pagina que loguea.
        if(mensaje == '0'):
            diccionario = dict(diccionario, **{'error':'Error: Clave o Usuario incorrectos.'})
        elif(mensaje == '1'):
            diccionario = dict(diccionario, **{'mensaje':'Se cerro sesion.'})
        
        return render_to_response( 'SistemaVentas/index.html',
                            diccionario,
                            context_instance=RequestContext(request),
                            )


def loguear(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            turno = Turno(  cajero          = username,
                            fecha_inicio    = datetime.now(),
                            fecha_fin       = None,
                            ajuste          = None
                         )
            turno.save()
            return redirect(reverse('SistemaVentas.acounts.views.ver_vender'))

    return redirect(reverse('SistemaVentas.acounts.views.index', args = ['0']))

@login_required(login_url='')
def desloguear(request):
    logout(request)
    return redirect( reverse('SistemaVentas.acounts.views.index', args=['1']) )


"""
    Funcion para mostrar movimientos
"""
@login_required(login_url='')
def ver_movimientos_raw(request, fi_dt, ff_dt):
    lista_movimientos_caja = MovimientoCaja.objects.filter(fecha__gte=fi_dt, fecha__lte = ff_dt).order_by('-fecha')
    lista_movimientos_ventas = VentaProducto.objects.filter(factura__fecha__gte=fi_dt, factura__fecha__lte = ff_dt).order_by('-factura__fecha')
    lista_facturas = Factura.objects.filter(fecha__gte=fi_dt, fecha__lte = ff_dt).order_by('-fecha')

    total_vendido_hoy = movimientos_ventas(fi_dt, ff_dt)
    total_recarga_hoy = movimientos_recarga(fi_dt, ff_dt)
    return render_to_response(  'SistemaVentas/vista_movimientos.html',
                                {
                                    "fecha_inical"     : fi_dt,
                                    "fecha_final"      : ff_dt,
                                    "movimientosCaja"  : lista_movimientos_caja, 
                                    "movimientosVentas": lista_movimientos_ventas,
                                    "facturas"         : lista_facturas,
                                    "totalVendidoHoy"  : total_vendido_hoy,
                                    "totalRecargaHoy"  : total_recarga_hoy,
                                    "apertura_caja"   : verificar_apertura_caja(1),
                                },
                                context_instance=RequestContext(request),
                                )

"""
    Funcion para mostrar movimientos
"""
@login_required(login_url='')
def ver_movimientos_hoy(request):
    hoy_i = datetime.today().replace(hour = 00, minute = 00)
    hoy_f = datetime.today().replace(hour = 23, minute = 59)
    
    return ver_movimientos_raw(request,fi_dt = hoy_i, ff_dt = hoy_f)

"""
    Funcion para mostrar movimientos
"""
@login_required(login_url='')
def ver_movimientos(request, fi, ff):
    fi_dt = datetime(int(fi[0:4]), int(fi[4:6]), int(fi[6:8]), int(fi[8:10]), int(fi[10:12]))
    ff_dt = datetime(int(ff[0:4]), int(ff[4:6]), int(ff[6:8]), int(ff[8:10]), int(ff[10:12]))
    return ver_movimientos_raw(request,fi_dt, ff_dt)


"""
    Funcion para mostrar abrir caja
"""
@login_required(login_url='')
def ver_caja_abrir_raw(request, fi_dt, ff_dt):
    
    total_en_ventas  = valor_o_cero(movimientos_ventas(fi_dt, ff_dt))
    total_recarga    = valor_o_cero(movimientos_recarga(fi_dt, ff_dt))
    
    total_vendido    = total_en_ventas - total_recarga;
    
    total_mov_caja   = valor_o_cero(movimientos_caja(fi_dt, ff_dt))
    total_ajustes    = valor_o_cero(movimientos_ajuste(fi_dt, ff_dt))
    
    total_caja       = total_mov_caja + total_ajustes;
    
    total_teorico    = total_vendido + total_caja + total_recarga;
    
    
    return render_to_response(  'SistemaVentas/vista_operaciones_caja/vista_abrir.html',
                                {
                                    "fecha_inical"     : fi_dt,
                                    "fecha_final"      : ff_dt,
                                    "total_en_ventas"  : total_en_ventas,
                                    "total_recarga"    : total_recarga,
                                    "total_vendido"    : total_vendido,
                                    "total_mov_caja"   : total_mov_caja,
                                    "total_ajustes"   : total_ajustes,
                                    "total_caja"      : total_caja, 
                                    "total_teorico"    : total_teorico,
                                },
                                context_instance=RequestContext(request),
                                )

"""
    Funcion para mostrar abrir caja
"""
@login_required(login_url='')
def ver_caja_abrir(request):
    hoy_i = datetime.today().replace(hour = 00, minute = 00)
    hoy_f = datetime.today().replace(hour = 23, minute = 59)
    return ver_caja_abrir_raw(request,fi_dt = hoy_i, ff_dt = hoy_f)

"""
    Funcion para mostrar caja
"""
@login_required(login_url='')
def ver_caja_raw(request, fi_dt, ff_dt):
    
    total_en_ventas  = valor_o_cero(movimientos_ventas(fi_dt, ff_dt))
    total_recarga    = valor_o_cero(movimientos_recarga(fi_dt, ff_dt))
    
    total_vendido    = total_en_ventas - total_recarga;
    
    total_mov_caja   = valor_o_cero(movimientos_caja(fi_dt, ff_dt))
    total_ajustes    = valor_o_cero(movimientos_ajuste(fi_dt, ff_dt))
    
    total_caja       = total_mov_caja + total_ajustes;
    
    total_teorico    = total_vendido + total_caja + total_recarga;
    
    
    return render_to_response(  'SistemaVentas/vista_caja.html',
                                {
                                    "fecha_inical"     : fi_dt,
                                    "fecha_final"      : ff_dt,
                                    "total_en_ventas"  : total_en_ventas,
                                    "total_recarga"    : total_recarga,
                                    "total_vendido"    : total_vendido,
                                    "total_mov_caja"   : total_mov_caja,
                                    "total_ajustes"   : total_ajustes,
                                    "total_caja"      : total_caja, 
                                    "total_teorico"    : total_teorico
                                },
                                context_instance=RequestContext(request),
                                )

"""
    Funcion para mostrar caja hoy
"""
@login_required(login_url='')
def ver_caja_hoy(request):
    hoy_i = datetime.today().replace(hour = 00, minute = 00)
    hoy_f = datetime.today().replace(hour = 23, minute = 59)
    return ver_caja_raw(request,fi_dt = hoy_i, ff_dt = hoy_f)

"""
    Funcion para mostrar caja
"""
@login_required(login_url='')
def ver_caja(request, fi, ff):
    fi_dt = datetime(int(fi[0:4]), int(fi[4:6]), int(fi[6:8]), int(fi[8:10]), int(fi[10:12]))
    ff_dt = datetime(int(ff[0:4]), int(ff[4:6]), int(ff[6:8]), int(ff[8:10]), int(ff[10:12]))
    return ver_caja_raw(request,fi_dt, ff_dt)


"""
    Funcion para mostrar cerrar caja
"""
@login_required(login_url='')
def ver_caja_cerrar_raw(request, fi_dt, ff_dt):
    
    total_en_ventas  = valor_o_cero(movimientos_ventas(fi_dt, ff_dt))
    total_recarga    = valor_o_cero(movimientos_recarga(fi_dt, ff_dt))
    
    total_vendido    = total_en_ventas - total_recarga;
    
    total_mov_caja   = valor_o_cero(movimientos_caja(fi_dt, ff_dt))
    total_ajustes    = valor_o_cero(movimientos_ajuste(fi_dt, ff_dt))
    
    total_caja       = total_mov_caja + total_ajustes;
    
    total_teorico    = total_vendido + total_caja + total_recarga;
    
    
    return render_to_response(  'SistemaVentas/vista_operaciones_caja/vista_cerrar.html',
                                {
                                    "fecha_inical"     : fi_dt,
                                    "fecha_final"      : ff_dt,
                                    "total_en_ventas"  : total_en_ventas,
                                    "total_recarga"    : total_recarga,
                                    "total_vendido"    : total_vendido,
                                    "total_mov_caja"   : total_mov_caja,
                                    "total_ajustes"   : total_ajustes,
                                    "total_caja"      : total_caja, 
                                    "total_teorico"    : total_teorico,
                                    "dif_totales"    : -total_teorico,
                                    "apertura_caja"   : verificar_apertura_caja(1)
                                },
                                context_instance=RequestContext(request),
                                )

"""
    Funcion para mostrar cerrar caja hoy
"""
@login_required(login_url='')
def ver_caja_cerrar(request):
    hoy_i = datetime.today().replace(hour = 00, minute = 00)
    hoy_f = datetime.today().replace(hour = 23, minute = 59)
    return ver_caja_cerrar_raw(request,fi_dt = hoy_i, ff_dt = hoy_f)

"""
    Vista para mostrar inventario
"""
@login_required(login_url='')
def ver_inventario(request):
    lista_productos = Producto.objects.order_by('nombre')

    return render_to_response(  'SistemaVentas/vista_inventario.html',
                                {"inventario":lista_productos},
                                context_instance=RequestContext(request),
                                )
                                

"""
    Vista para agregar compras de inventario
"""
@login_required(login_url='')
def compra_inventario(request):
    productos = Producto.objects.order_by('nombre')
    compras   = CompraInventario.objects.all().order_by('-fecha')[:40]

    return render_to_response(  'SistemaVentas/vista_operaciones_inventario/vista_compra_inventario.html',
                                {
                                    "productos" : productos,
                                    "compras"   : compras  ,
                                },
                                context_instance=RequestContext(request),
                                )


"""
    Funcion para agregar compras de inventario
"""
@login_required(login_url='')
def compra_inventario_do(request):
    
    p = get_object_or_404(Producto, id = request.POST['producto'])
    
    if(request.POST['costo']):
        c = long(request.POST['costo'])
    else:
        c = None
        
    cantidad_l = long(request.POST['cantidad'])
    
    ci = CompraInventario(producto = p, cantidad = cantidad_l, fecha = datetime.now(), costo = c)
    
    ci.save()
    
    p.cantidad += cantidad_l
    p.save()
    
    return redirect(reverse('SistemaVentas.acounts.views.compra_inventario'))


"""
    Vista para modificar precios a productos
"""
@login_required(login_url='')
def modificar_inventario(request):

	lista_productos = Producto.objects.order_by('nombre')
	return render_to_response(  'SistemaVentas/vista_operaciones_inventario/vista_modificar_inventario.html',
                                {
                                    "lista_productos" : lista_productos,
                                },
                                context_instance=RequestContext(request),
                                )

"""
    Funcion para modificar precios al inventario
"""
@login_required(login_url='')
def modificar_inventario_do(request):
    
    p = get_object_or_404(Producto, id = request.POST['productos'])
    
    if(request.POST['precio']):
        precio_nuevo = literal_eval(request.POST['precio'])
    else:
        return redirect(reverse('SistemaVentas.acounts.views.modificar_inventario'))
    
    pr = Precio(producto = p, valor = precio_nuevo, fecha = datetime.now())
    
    pr.save()
    
    return redirect(reverse('SistemaVentas.acounts.views.modificar_inventario'))

"""
    Funcion para mostrar usuarios
"""
@login_required(login_url='')
def ver_usuarios(request):
    lista_usuarios = Usuario.objects.exclude(cedula = 0).order_by('nombre')
    return render_to_response(  'SistemaVentas/vista_usuarios.html',
                                {   "usuario":lista_usuarios,
                                    "apertura_caja"   : verificar_apertura_caja(1)
                                },
                                context_instance=RequestContext(request),
                                )

"""
    Funcion para mostrar ayuda
"""

@login_required(login_url='')
def ver_controlador_ayuda(request):
    tipoPag = request.POST["tipo"]
    if tipoPag == 'caja':
        return render_to_response(  'SistemaVentas/vista_ayuda/vista_ayuda_caja.html',
		                            {},
		                            context_instance=RequestContext(request),
		                         )
    elif tipoPag == 'caja_abrir':
        return render_to_response(  'SistemaVentas/vista_ayuda/vista_ayuda_abrir.html',
		                            {},
		                            context_instance=RequestContext(request),
		                         )
    elif tipoPag == 'caja_cerrar':
        return render_to_response(  'SistemaVentas/vista_ayuda/vista_ayuda_cerrar.html',
		                            {},
		                            context_instance=RequestContext(request),
		                         )
    elif tipoPag == 'inventario':
        return render_to_response(  'SistemaVentas/vista_ayuda/vista_ayuda_inventario.html',
		                            {},
		                            context_instance=RequestContext(request),
		                         )
    elif tipoPag == 'inventario_modificar':
        return render_to_response(  'SistemaVentas/vista_ayuda/vista_ayuda_inventario_modificar.html',
		                            {},
		                            context_instance=RequestContext(request),
		                         )
    elif tipoPag == 'inventario_compra':
        return render_to_response(  'SistemaVentas/vista_ayuda/vista_ayuda_inventario_compra.html',
		                            {},
		                            context_instance=RequestContext(request),
		                         )
    elif tipoPag == 'movimientos':
        return render_to_response(  'SistemaVentas/vista_ayuda/vista_ayuda_movimientos.html',
		                            {},
		                            context_instance=RequestContext(request),
		                         )
    elif tipoPag == 'ventas':
        return render_to_response(  'SistemaVentas/vista_ayuda/vista_ayuda_ventas.html',
		                            {},
		                            context_instance=RequestContext(request),
		                         )
    elif tipoPag == 'usuarios':
        return render_to_response(  'SistemaVentas/vista_ayuda/vista_ayuda_usuarios.html',
		                            {},
		                            context_instance=RequestContext(request),
		                         )

"""
    Funcion Template para renderizar la vista de ventas
    El parametro "anadir_a_diccionario" recibe un diccionario que sera concatenado
    con el diccionario de contexto del template.
"""
def response_vender_productos(request, anadir_a_diccionario):
    cinco_productos = Producto.objects.filter(cantidad__gt = 0)[:10]

    diccionario = {  'cinco_productos' : cinco_productos, #Lista de los productos mas vendidos
                     'salir'           : reverse('SistemaVentas.acounts.views.desloguear'), #Direccion url de la pagina para desloguear.
                     'usuario'         : request.user,                           #Usuario de la sesion.
                     'apertura_caja'   : verificar_apertura_caja(1),
                     }
    if(anadir_a_diccionario != None): diccionario = dict(diccionario, **anadir_a_diccionario)        
    return render_to_response(  'SistemaVentas/vista_ventas.html',
                                diccionario,
                                context_instance=RequestContext(request),
                                )


"""Vista para cuando hubo venta exitosa"""
@login_required(login_url='')
def compra_ok(request):
    return response_vender_productos(request, {'mensaje' : 'Venta realizada'})



"""Vista de ventas"""
@login_required(login_url='')
def ver_vender(request):
    return response_vender_productos(request, None)

#AJAX:
@login_required(login_url='')
def buscar_productos(request):
    from django.utils import simplejson

    busqueda = request.GET['busqueda']

    busquedas = busqueda.split(' ')
    resultados = Producto.objects.filter(cantidad__gt = 0)
    #Filtro por cada palabra de busqueda
    for b in busquedas:
        resultados = resultados.filter(nombre__icontains = b)

    #Maximo diez resultados:
    resultados[:10];
    
    respuesta = []
    for p in resultados:
        respuesta.append({'nombre':p.nombre, 'precio':p.precio_str(), 'inventario':p.cantidad, 'imagen':p.imagen.url, 'descripcion':p.descripcion, 'proveedor':p.proveedor});
    
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')

#AJAX:
@login_required(login_url='')
def buscar_usuario(request):
    from django.utils import simplejson

    busqueda = request.GET['busqueda']

    busquedas = busqueda.split(' ')
    resultados_nombre = Usuario.objects.all()
    #Filtro por cada palabra de busqueda
    for b in busquedas:
        resultados_nombre = resultados_nombre.filter(nombre__icontains = b)

    resultados_cedula = Usuario.objects.all()
    #Filtro por cada palabra de busqueda
    for b in busquedas:
        resultados_cedula = resultados_cedula.filter(nombre__icontains = b)
    
    
    
    #Maximo un resultado:
    resultados_cedula = resultados_cedula[:1];
    if resultados_cedula.exists() :
        resultados = resultados_cedula;
    else:
        resultados = resultados_nombre[:1];

    respuesta = []
    for u in resultados:
        respuesta.append({'nombre': u.nombre, 'cedula':u.cedula, 'carnet':u.carnet, 'saldo':u.saldo_str()});


    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')



""" Vista para Eliminar producto del inventario"""
@login_required(login_url='')
def eliminar_producto_inventario(request, prod_id):
    get_object_or_404(Producto, id = prod_id).delete()
    return redirect(reverse('SistemaVentas.acounts.views.ver_inventario'))

""" Vista para Eliminar usuario del sistema"""
@login_required(login_url='')
def eliminar_usuario(request, id_cedula):
    get_object_or_404(Usuario, cedula = id_cedula).delete()
    return redirect(reverse('SistemaVentas.acounts.views.ver_usuarios'))

""" Vista para guardar en la BD la compra, redirecciona de nuevo a la vista de ventas"""
@login_required(login_url='')
def comprar(request):
    productos = literal_eval(request.POST["productos"])
    pago      = literal_eval(request.POST["pago"])
    
    try:
        usr = get_object_or_404(Usuario, cedula = request.POST["cliente"])
    except MultiValueDictKeyError:
        n_c = literal_eval(request.POST["nuevo_cliente"])
        usr = Usuario(  nombre = n_c["nombre"],
                        cedula = n_c["cedula"],
                        carnet = n_c["carnet"],
                        saldo  = 0,
                        fecha  = datetime.now(),
                        tipo   = 'C')
    
    f = Factura( usuario = usr, fecha = datetime.now())
    f.save()
    
    for d in productos:
        prod = get_object_or_404(Producto, nombre = d["nombre"])
        
        pv = VentaProducto(producto = prod, factura = f, cantidad = d["cantidad"], precio = prod.precio_obj())
        pv.save()
        
        prod.ventas   += 1
        prod.cantidad -= pv.cantidad
        prod.save()
    
    e = Decimal(pago['efectivo'])
    d = Decimal(pago['donacion'])
    r = Decimal(pago['recarga'])
    s = Decimal(pago['saldo'])
    
    if(e > 0):
        m1 = MovimientoVentas(factura = f, tipo = 'E', cantidad =  e)
        m1.save()
    if(d > 0):
        m1 = MovimientoVentas(factura = f, tipo = 'D', cantidad =  d)
        m1.save
    if(r > 0):
        m1 = MovimientoVentas(factura = f, tipo = 'R', cantidad = r)
        m1.save()
        usr.saldo += r
    if(s > 0):
        m1 = MovimientoVentas(factura = f, tipo = 'S', cantidad = s)
        m1.save()
        usr.saldo -= s
       
    usr.save()
   
    return redirect(reverse('SistemaVentas.acounts.views.compra_ok'))

""" Vista para guardar en la BD el nuevo cliente, redirecciona de nuevo a la vista de usuarios"""
@login_required(login_url='')
def nuevo_cliente(request):
    usr = Usuario(  nombre = request.POST["nombre"],
                    cedula = request.POST["cedula"],
                    carnet = request.POST["carnet"],
                    saldo  = Decimal(request.POST["saldo"]),
                    fecha  = datetime.now(),
                    tipo   = 'C')

    moc = MovimientoCaja( tipo          = 'I',
                          cantidad      = Decimal(request.POST["saldo"]),
                          descripcion   = 'Inscripcion de ' + request.POST["nombre"],
                          fecha         = datetime.now())

    moc.save()
    usr.save()
    
    return redirect(reverse('SistemaVentas.acounts.views.ver_usuarios'))

""" Vista para guardar en la BD el nuevo producto, redirecciona de nuevo a la vista de inventario"""
@login_required(login_url='')
def nuevo_producto(request):
    
    pro = Producto( nombre   = request.POST["nombre"],
                    cantidad = request.POST["cantidad"],
                    imagen   = request.FILES["foto"],  #'Imagenes/Productos/vario.jpg',
                    ventas   = 0,
                    descripcion = request.POST["descripcion"],
                    proveedor = request.POST["proveedor"])
    
    pro.save()

    p = Precio( producto = pro, fecha = datetime.now(), valor = request.POST["precio"])
    p.save()
    
    return redirect(reverse('SistemaVentas.acounts.views.ver_inventario'))

""" Vista para guardar en la BD el nuevo movimiento, redirecciona de nuevo a la vista de movimientos"""
@login_required(login_url='')
def nuevo_movimiento(request):
    moc = MovimientoCaja( tipo          = request.POST["tipo"],
                          cantidad      = Decimal(request.POST["cantidad"]),
                          descripcion   = request.POST["motivo"],
                          fecha         = datetime.now())

    moc.save()
    
    return redirect(reverse('SistemaVentas.acounts.views.ver_movimientos_hoy'))

def guardaBilletesTurno(denom, turn, cant):
    er = EfectivoReal ( denominacion = Decimal(denom), 
                        imagen = 'Imagenes/Efectivo/' + denom+'.jpg'
                      )
    er.save()
    b = Efectivo(denominacion = er,
                 cantidad     = cant,
                 modificado   = 'T',
                 turno_cajero = turn
                )
    return b

""" Vista para actualizar caja"""
@login_required(login_url='')
def abrir_caja(request):
    total = Decimal(request.POST["total"])
    if total != 0:
        moc = MovimientoCaja( tipo          = 'I',
                              cantidad      = total,
                              descripcion   = 'Caja Inicial',
                              fecha         = datetime.now())

        moc.save()

    return redirect(reverse('SistemaVentas.acounts.views.ver_movimientos_hoy'))

""" Vista para actualizar caja"""
@login_required(login_url='')
def cerrar_caja(request):

    turno = Turno.objects.latest('fecha_inicio')
    turno.id = turno.id

    if turno.ajuste == None:

        diferencia = Decimal(request.POST["dif_totales"])
        moc = None

        if diferencia != 0:
            tipo_dif = 'P'
            if diferencia < 0:
                tipo_dif = 'N'
            moc = MovimientoCaja( tipo          = tipo_dif,
                                  cantidad      = diferencia,
                                  descripcion   = 'Hubo diferencia entre caja y sistema',
                                  fecha         = datetime.now())

            moc.save()

        turno.fecha_fin = datetime.now()
        turno.ajuste = moc
        turno.save()

        b001 = guardaBilletesTurno('0.01', turno, int(request.POST["d0.01"]))
        b001.save()
        b005 = guardaBilletesTurno('0.05', turno, int(request.POST["d0.05"]))
        b005.save()
        b01 = guardaBilletesTurno('0.1', turno, int(request.POST["d0.1"]))
        b01.save()
        b0125 = guardaBilletesTurno('0.125', turno, int(request.POST["d0.125"]))
        b0125.save()
        b025 = guardaBilletesTurno('0.25', turno, int(request.POST["d0.25"]))
        b025.save()
        b05 = guardaBilletesTurno('0.5', turno, int(request.POST["d0.5"]))
        b05.save()
        b1 = guardaBilletesTurno('1', turno, int(request.POST["d1"]))
        b1.save()
        b2 = guardaBilletesTurno('2', turno, int(request.POST["d2"]))
        b2.save()
        b5 = guardaBilletesTurno('5', turno, int(request.POST["d5"]))
        b5.save()
        b10 = guardaBilletesTurno('10', turno, int(request.POST["d10"]))
        b10.save()
        b20 = guardaBilletesTurno('20', turno, int(request.POST["d20"]))
        b20.save()
        b50 = guardaBilletesTurno('50', turno, int(request.POST["d50"]))
        b50.save()
        b100 = guardaBilletesTurno('100', turno, int(request.POST["d100"]))
        b100.save()

    return redirect(reverse('SistemaVentas.acounts.views.ver_movimientos_hoy'))
    
""" Script para resolver un problema del sistema y acomodar la base de datos """
@login_required(login_url='')
def script(request):

    fac = Factura.objects.all()
    for f in fac:
        tm = f.movimientoventas_set.aggregate(r=Sum('cantidad'))['r']
        tr = f.total()
        
        if tm == None : tm = 0
        if tr == None : tr = 0
        
        if tm < tr:
            c = tr-tm
            m = MovimientoVentas(factura = f, tipo = 'E', cantidad =  c)
            m.save()
    
    return redirect(reverse('SistemaVentas.acounts.views.ver_inventario'))

"""
    Funcion para verificar que se realizo apertura de caja
"""
def verificar_apertura_caja(p):
    fi_dt = datetime.today().replace(hour = 00, minute = 00)
    ff_dt = datetime.today().replace(hour = 23, minute = 59)

    lista_movimientos_caja = list(MovimientoCaja.objects.filter(fecha__gte=fi_dt, fecha__lte = ff_dt).order_by('-fecha'))
    p = ''

    for mov in lista_movimientos_caja:
        if mov.get_descripcion() == 'Caja Inicial':
            return 'si'
    return 'no'
