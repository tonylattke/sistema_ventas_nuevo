from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import Movimiento, MovimientoCaja


@login_required(login_url='')
def get(request):
    resultados = MovimientoCaja.objects.all()
    
    respuesta = []
    for movimiento in resultados:
        respuesta.append( movimiento.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    movimiento = MovimientoCaja(
                        cantidad    = float(request.POST["cantidad"]),
                        tipo        = request.POST["tipo"],
                        descripcion = request.POST["descripcion"], 
                        fecha       = datetime.now()
                 )

    movimiento.save()

    return HttpResponse(simplejson.dumps( movimiento.resumen()), content_type = 'application/javascript; charset=utf8')


@transaction.commit_on_success
@login_required(login_url='')
def put(request, id):
    movimiento = get_object_or_404(MovimientoCaja, id=id)
    
    if request.POST.has_key('cantidad'):
        movimiento.cantidad = float(request.POST["cantidad"])
    
    if request.POST.has_key('tipo'):
        movimiento.tipo = request.POST["tipo"]

    if request.POST.has_key('descripcion'):
        movimiento.descripcion = request.POST["descripcion"]
    
    movimiento.save()
    
    return HttpResponse(simplejson.dumps( movimiento.resumen() ), content_type = 'application/javascript; charset=utf8')

@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    movimiento = get_object_or_404(MovimientoCaja, id=id)
    movimiento.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')