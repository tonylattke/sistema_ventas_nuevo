from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import CompraInventario, Producto
from django.utils.itercompat import product



@login_required(login_url='')
def get(request):
    resultados = CompraInventario.objects..all()
    
    respuesta = []
    for compraInventario in resultados:
        respuesta.append( compraInventario.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    productoAux = get_object_or_404(Producto, id=id)
    
    costoAux = 0
    
    if(request.GET['costo']):
        costoAux = long(request.GET['costo'])
    else:
        costoAux = None
    
    compraInventario = CompraInventario(
                        producto = productoAux,
                        cantidad = request.GET["cantidad"],
                        fecha    = datetime.now(,)
                        costo    = costoAux
                      )
    
    compraInventario.save()
    
    productoAux.cantidad += compraInventario.cantidad
    productoAux.save()
    
    return HttpResponse(simplejson.dumps( compraInventario.resumen()), content_type = 'application/javascript; charset=utf8')


@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    compraInventario = get_object_or_404(CompraInventario, id=id)
    
    producto = get_object_or_404(Producto, id=compraInventario.producto)
    if compraInventario.cantidad <= producto.cantidad:
        producto.cantidad -= compraInventario.cantidad
        producto.save() 
    
    compraInventario.delete()
    
    
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')