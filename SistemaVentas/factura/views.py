from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import Factura, MovimientoVentas, Producto, Usuario, VentaProducto


@login_required(login_url='')
def get(request):
    resultados = Factura.objects.all()

    respuesta = []
    for factura in resultados:
        respuesta.append(factura.resumen())

    return HttpResponse(simplejson.dumps(respuesta), content_type='application/javascript; charset=utf8')


@login_required(login_url='')
def post(request):
    ventas_json = simplejson.loads(request.POST["ventas"])
    cliente_json = simplejson.loads(request.POST["cliente"])

    usuario = None

    if cliente_json['cedula'] == 0:
        try:
            usuario = Usuario.objects.get(0)
        except ObjectDoesNotExist:
            raise Exception('Fallo de Administracion, Cree en la BD el usuario "Anonimo" con cedula, saldo y carnet 0')

    else:
        try:
            usuario = Usuario.objects.get(cliente_json['cedula'])
        except ObjectDoesNotExist:
            # Si no se encuentra hay que crear el nuevo Cliente:
            usuario = Usuario(cedula=cliente_json['cedula'], nombre=cliente_json['nombre'], carnet=cliente_json['carnet'], saldo=0)
            usuario.save()

    factura = Factura(usuario=usuario)
    factura.save()

    #FALTAN ATACHEAR LAS VENTAS Y MOVIMIENTOS, ADEMAS DE REVISAR PORQUE SE PARSEAN DISTINTO




    pago = literal_eval(request.POST["pago"])
    tiempo = datetime.now()

    try:
        usr = get_object_or_404(Usuario, cedula=request.POST["cliente"])
    except MultiValueDictKeyError:
        n_c = literal_eval(request.POST["nuevo_cliente"])
        usr = Usuario(nombre=n_c["nombre"],
                        cedula=n_c["cedula"],
                        carnet=n_c["carnet"],
                        saldo=0,
                        fecha=tiempo,
                        tipo='C')

    factura = Factura(
                        fecha=tiempo,
                        usuario=usr
                     )

    factura.save()

    for d in productos:
        prod = get_object_or_404(Producto, nombre=d["nombre"])

        pv = VentaProducto(producto=prod, factura=f, cantidad=d["cantidad"], precio=prod.precio_obj())
        pv.save()

        prod.ventas += 1
        prod.cantidad -= pv.cantidad
        prod.save()

    e = Decimal(pago['efectivo'])
    d = Decimal(pago['donacion'])
    r = Decimal(pago['recarga'])
    s = Decimal(pago['saldo'])

    if(e > 0):
        m1 = MovimientoVentas(factura=f, tipo='E', cantidad=e)
        m1.save()
    if(d > 0):
        m1 = MovimientoVentas(factura=f, tipo='D', cantidad=d)
        m1.save
    if(r > 0):
        m1 = MovimientoVentas(factura=f, tipo='R', cantidad=r)
        m1.save()
        usr.saldo += r
    if(s > 0):
        m1 = MovimientoVentas(factura=f, tipo='S', cantidad=s)
        m1.save()
        usr.saldo -= s

    usr.save()

    return HttpResponse(simplejson.dumps(factura.resumen()), content_type='application/javascript; charset=utf8')


@login_required(login_url='')
def delete(request, id):
    facturaAux = get_object_or_404(Factura, id=id)
    movimientoVentas = MovimientoVentas.objects.filter(factura=facturaAux.id)
    usuario = Usuario.objects.filter(cedula=facturaAux.usuario.cedula)
    ventaProductos = VentaProducto.objects.filter(factura=facturaAux.id)
    productos = Producto.objects.all()
    
    for movimiento in movimientoVentas:
        if movimiento.tipo == 'R':
            usuario.saldo -= movimiento.cantidad
            usuario.save()
        if movimiento.tipo == 'S':
            usuario.saldo += movimiento.cantidad
            usuario.save()
        movimiento.delete()
    
    for ventaProducto in ventaProductos:
        for producto in productos:
            if producto.id == ventaProducto.producto:
                producto.cantidad += ventaProducto.cantidad
                producto.ventas -= 1
                producto.save() 
        ventaProducto.delete()

    facturaAux.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')