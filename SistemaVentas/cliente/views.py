from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import Usuario



@login_required(login_url='')
def get(request):
    resultados = Usuario.objects.all()
    
    respuesta = []
    for usuario in resultados:
        respuesta.append( usuario.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    usuario = Usuario(
                        cedula   = int(request.POST["cedula"]), 
                        carnet   = request.POST["carnet"],
                        nombre   = request.POST["nombre"],
                        fecha    = datetime.now(),
                        tipo     = request.POST["tipo"],
                        saldo    = request.POST["saldo"]
                      )
    
    usuario.save()
    
    return HttpResponse(simplejson.dumps( usuario.resumen()), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def put(request, id):
    usuario = get_object_or_404(Usuario, cedula=id)
    
    if request.POST.has_key('saldo'):
        usuario.saldo = float(request.POST["saldo"])
    
    usuario.save()
    
    return HttpResponse(simplejson.dumps( usuario.resumen() ), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    usuario = get_object_or_404(Usuario, cedula=id)
    usuario.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')