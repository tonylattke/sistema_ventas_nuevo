from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import Producto, Precio



@login_required(login_url='')
def get(request):
    resultados = Producto.objects.prefetch_related('precio_set').all()
    
    respuesta = []
    for producto in resultados:
        respuesta.append( producto.resumen() )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    producto = Producto(
                        nombre   = request.POST["nombre"],
                        cantidad = request.POST["cantidad"],
                        imagen   = 'Imagenes/Productos/vario.jpg', #request.FILES["foto"],
                        ventas   = 0,
                        descripcion = request.POST["descripcion"],
                        proveedor = request.POST["proveedor"]
                        )
    
    producto.save()
    
    precio = Precio( producto = producto, fecha = datetime.now(), valor = request.POST["precio"])
    precio.save()
    
    return HttpResponse(simplejson.dumps( producto.resumen()), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def put(request, id):
    producto = get_object_or_404(Producto, id=id)
    
    if request.POST.has_key('precio'):
        precio = Precio( producto = producto, fecha = datetime.now(), valor = float(request.POST["precio"]))
        precio.save()
    
    if request.POST.has_key('inventario'):
        producto.cantidad = request.POST["inventario"]
    
    producto.save()
    
    return HttpResponse(simplejson.dumps( producto.resumen() ), content_type = 'application/javascript; charset=utf8')



@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    producto = get_object_or_404(Producto, id=id)
    producto.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')