from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import Deuda, Producto, Usuario



@login_required(login_url='')
def get(request):
    resultados = Deuda.objects.all()
    
    respuesta = []
    for deuda in resultados:
        respuesta.append( deuda.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    productoAux = get_object_or_404(Producto, id = request.POST["producto"])
    usuarioAux = get_object_or_404(Usuario, cedula = request.POST["usuario"])
    deuda = Deuda(
                        producto = productoAux, 
                        cantidad = int(request.POST["cantidad"]),
                        usuario  = usuarioAux
                 )

    deuda.save()
    if productoAux.cantidad - int(request.POST["cantidad"]) >= 0:
        productoAux.cantidad = productoAux.cantidad - int(request.POST["cantidad"])
    productoAux.save()

    return HttpResponse(simplejson.dumps( deuda.resumen()), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def put(request, id):
    deuda = get_object_or_404(Deuda, id=id)

    if request.POST.has_key('cantidad'):
        producto        = get_object_or_404(Producto, id = deuda.producto.id)
        cantidadActual  = deuda.cantidad
        cantidadRequest = int(request.POST["cantidad"])
        if cantidadRequest < 1:
            return error
        if cantidadRequest > 0:
            if cantidadRequest > deuda.cantidad:
                if cantidadRequest - deuda.cantidad > producto.cantidad:
                    producto.cantidad -= cantidadRequest - deuda.cantidad
                    deuda.cantidad     = cantidadRequest
                    producto.save()
            if cantidadRequest < deuda.cantidad:
                deuda.cantidad     = cantidadRequest
                producto.cantidad += deuda.cantidad - cantidadRequest 
                producto.save()
    
    deuda.save()
    
    return HttpResponse(simplejson.dumps( deuda.resumen() ), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    deuda = get_object_or_404(Deuda, id=id)
    deuda.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')