from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import Turno, MovimientoCaja



@login_required(login_url='')
def get(request):
    resultados = Turno.objects.all()
    
    respuesta = []
    for turno in resultados:
        respuesta.append( turno.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    turno = Turno(
                        cajero   = request.POST["nombre"],
                        fecha_inicio = datetime.now(),
                        fecha_fin = datetime.now(),
                        ajuste = None
                 )
    
    turno.save()

    return HttpResponse(simplejson.dumps( turno.resumen()), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def put(request, id):
    turno = get_object_or_404(Turno, id=id)    
    turno.fecha_fin = datetime.now()
    
    if request.POST.has_key('cantidad') & request.POST.has_key('tipo'):
        movimientoAux = None
        if request.POST["tipo"] == 'P':
            movimientoAux = MovimientoCaja(
                                cantidad    = float(request.POST["cantidad"]),
                                tipo        = request.POST["tipo"],
                                descripcion = "Falto dinero en caja", 
                                fecha       = datetime.now()
                            )
            movimientoAux.save()
        if request.POST["tipo"] == 'N':
            movimientoAux = MovimientoCaja(
                                cantidad    = float(request.POST["cantidad"]),
                                tipo        = request.POST["tipo"],
                                descripcion = "Sobro dinero en caja", 
                                fecha       = datetime.now()
                            )
            movimientoAux.save()
        turno.ajuste = movimientoAux
    turno.save()
    
    return HttpResponse(simplejson.dumps( turno.resumen() ), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    turno = get_object_or_404(Turno, id=id)
    turno.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')