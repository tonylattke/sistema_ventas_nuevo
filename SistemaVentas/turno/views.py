from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import Turno



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
                        cajero   = request.GET["nombre"],
                        fecha_inicio = datetime.now(),
                        fecha_fin = datetime.now(),
                        ajuste = 0
                 )
    
    turno.save()

    return HttpResponse(simplejson.dumps( turno.resumen()), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def put(request, id):
    turno = get_object_or_404(Turno, id=id)
    
    if request.GET.has_key('fecha_fin'):
        turno.fecha_fin = datetime.now()
    
    if request.GET.has_key('ajuste'):
        turno.ajuste = request.GET["ajuste"]
    
    turno.save()
    
    return HttpResponse(simplejson.dumps( turno.resumen() ), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    turno = get_object_or_404(Turno, id=id)
    turno.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')



