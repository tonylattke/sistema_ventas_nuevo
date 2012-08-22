from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import VentaProducto



@login_required(login_url='')
def get(request):
    resultados = VentaProducto.objects.all()
    
    respuesta = []
    for ventaProducto in resultados:
        respuesta.append( ventaProducto.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')