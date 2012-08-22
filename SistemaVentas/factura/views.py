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
        respuesta.append( factura.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    productos = literal_eval(request.POST["productos"])
    pago      = literal_eval(request.POST["pago"])
    tiempo = datetime.now()
    
    try:
        usr = get_object_or_404(Usuario, cedula = request.POST["cliente"])
    except MultiValueDictKeyError:
        n_c = literal_eval(request.POST["nuevo_cliente"])
        usr = Usuario(  nombre = n_c["nombre"],
                        cedula = n_c["cedula"],
                        carnet = n_c["carnet"],
                        saldo  = 0,
                        fecha  = tiempo,
                        tipo   = 'C')
    
    factura = Factura(
                        fecha    = tiempo,
                        usuario  = usr
                     )

    factura.save()
    
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

    return HttpResponse(simplejson.dumps( factura.resumen()), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    factura = get_object_or_404(Factura, id=id)
    movimientoVentas = MovimientoVentas.objects.all()
    usuarios  = Usuario.objects.all()
    ventaProductos = VentaProducto.objects.all()
    productos = Producto.objects.all()
    
    for movimiento in movimientoVentas:
        if movimiento.factura == factura.id:
            if movimiento.tipo == 'R':
                for usr in usuarios:
                    if usr.cedula == factura.usuario:
                        usr.saldo -= movimiento.cantidad
                        usr.save()
            if movimiento.tipo == 'S':
                for usr in usuarios:
                    if usr.cedula == factura.usuario:
                        usr.saldo += movimiento.cantidad
                        usr.save()
            movimiento.delete()
    
    for ventaProducto in ventaProductos:
        if ventaProducto.factura == factura.id:
            for producto in productos:
                if producto.id == ventaProducto.producto:
                    producto.cantidad += ventaProducto.cantidad
                    producto.ventas -= 1 
        ventaProducto.delete()

    factura.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')