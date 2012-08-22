from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import Movimiento, MovimientoVentas


@login_required(login_url='')
def get(request):
    resultados = MovimientoVentas.objects.all()
    
    respuesta = []
    for movimiento in resultados:
        respuesta.append( movimiento.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    facturaAux = get_object_or_404(Factura, id=id)
    movimiento = MovimientoVentas(
                        cantidad = float(request.GET["cantidad"]),
                        tipo     = request.GET["tipo"],
                        factura  = facturaAux
                 )

    movimiento.save()

    return HttpResponse(simplejson.dumps( movimiento.resumen()), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def put(request, id):
    movimiento = get_object_or_404(MovimientoVentas, id=id)
    
    if request.GET.has_key('cantidad'):
        movimiento.cantidad = float(request.GET["cantidad"])
    
    if request.GET.has_key('tipo'):
        movimiento.tipo = request.GET["tipo"]
    
    movimiento.save()
    
    return HttpResponse(simplejson.dumps( movimiento.resumen() ), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    movimiento = get_object_or_404(MovimientoVentas, id=id)
    movimiento.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')