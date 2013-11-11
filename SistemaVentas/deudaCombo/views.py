from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import DeudaCombo, Combo, Usuario, Producto, ComboProducto


@login_required(login_url='')
def get(request):
    resultados = DeudaCombo.objects.all()
    
    respuesta = []
    for deuda in resultados:
        respuesta.append( deuda.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')

@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    comboAux        = get_object_or_404(Combo, id = request.POST["combo"])
    usuarioAux      = get_object_or_404(Usuario, cedula = request.POST["usuario"])
    cantidad_combos = int(request.POST["cantidad"])

    deuda = DeudaCombo(
                combo    = comboAux, 
                cantidad = cantidad_combos,
                usuario  = usuarioAux
             )
    deuda.save()

    combo_productos = ComboProducto.objects.filter(combo=comboAux)
    estado          = True
    for combo_producto in combo_productos:
        if combo_producto.producto.cantidad - (cantidad_combos*combo_producto.cantidad) < 0:
            estado = False
    if estado:
        for combo_producto in combo_productos:
            productoAux           = combo_producto.producto
            productoAux.cantidad -= cantidad_combos*combo_producto.cantidad
            productoAux.save()

    return HttpResponse(simplejson.dumps( deuda.resumen()), content_type = 'application/javascript; charset=utf8')

@transaction.commit_on_success
@login_required(login_url='')
def put(request, id):
    deuda = get_object_or_404(DeudaCombo, id=id)

    if request.POST.has_key('cantidad'):
        cantidadActual  = deuda.cantidad
        cantidadRequest = int(request.POST["cantidad"])
        if cantidadRequest < 1:
            return error
        if cantidadRequest > 0:
            combo = deuda.combo
            if cantidadRequest > deuda.cantidad:
                combo_productos = ComboProducto.objects.filter(combo=combo)
                estado          = True
                agregados       = cantidadRequest - cantidadActual
                for combo_producto in combo_productos:
                    if agregados*combo_producto.cantidad > producto.cantidad:
                        estado = False
                if estado:
                    for combo_producto in combo_productos:
                        productoAux           = combo_producto.producto
                        productoAux.cantidad -= agregados*combo_producto.cantidad
                        productoAux.save()
            elif cantidadRequest < deuda.cantidad:
                combo_productos = ComboProducto.objects.filter(combo=combo)
                estado          = True
                eliminados      = cantidadRequest - cantidadActual
                for combo_producto in combo_productos:
                    productoAux           = combo_producto.producto
                    productoAux.cantidad += eliminados*combo_producto.cantidad
                    productoAux.save()
                deuda.cantidad   = cantidadRequest

    deuda.save()
    
    return HttpResponse(simplejson.dumps( deuda.resumen() ), content_type = 'application/javascript; charset=utf8')

@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    deuda = get_object_or_404(DeudaCombo, id=id)
    deuda.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')