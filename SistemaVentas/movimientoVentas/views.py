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