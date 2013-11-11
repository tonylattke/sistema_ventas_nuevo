from datetime    import *

from django.contrib.auth.decorators import login_required
from django.utils         import simplejson
from django.http          import HttpResponse
from django.views.generic import TemplateView
from django.db            import transaction
from django.shortcuts     import get_object_or_404

from SistemaVentas.models import Combo, ComboProducto, PrecioCombo, Producto

@login_required(login_url='')
def get(request):
    resultados = Combo.objects.all()
    
    respuesta = []
    for combo in resultados:
        salida_productos = []
        combo_productos  = ComboProducto.objects.filter(combo=combo)
        for aux in combo_productos:
            combo_producto = {
                                'producto'  : aux.producto.resumen(),
                                'cantidad'  : aux.cantidad,
                            }
            salida_productos.append(combo_producto)
        salida_combo = combo.resumen()
        salida_combo['productos'] = salida_productos
        respuesta.append( salida_combo )
    
    return HttpResponse(simplejson.dumps(respuesta), content_type = 'application/javascript; charset=utf8')

@transaction.commit_on_success
@login_required(login_url='')
def post(request):
    combo = Combo(
                    nombre   = request.POST["nombre"],
                )
    combo.save()

    i = 0
    while (request.POST.has_key("p_" + str(i) + "_id" ):
        aux_producto = get_object_or_404(Producto, id=int(request.POST["p_" + str(i) + "_id" ]))
        combo_producto = ComboProducto( 
                producto    = aux_producto, 
                combo       = combo, 
                cantidad    = int(request.POST["p_" + str(i) + "_name"])
            )
        combo_producto.save()
        i += 1
    
    precio = PrecioCombo( combo = combo, fecha = datetime.now(), valor = request.POST["precio"])
    precio.save()
    
    return HttpResponse(simplejson.dumps( combo.resumen()), content_type = 'application/javascript; charset=utf8')

@transaction.commit_on_success
@login_required(login_url='')
def put(request, id):
    combo = get_object_or_404(Combo, id=id)
    
    if request.POST.has_key('precio'):
        precio = PrecioCombo( combo = combo, fecha = datetime.now(), valor = float(request.POST["precio"]))
        precio.save()
    
    if request.POST.has_key('nombre'):
        aux_nombre = request.POST["nombre"]
        aux_combo = Combo.objects.filter(nombre=aux_nombre)
        if (not(aux_combo)):
            combo.nombre = aux_nombre
            combo.save()
    
    return HttpResponse(simplejson.dumps( combo.resumen() ), content_type = 'application/javascript; charset=utf8')


@transaction.commit_on_success
@login_required(login_url='')
def delete(request, id):
    combo = get_object_or_404(Combo, id=id)
    combo_productos = ComboProducto.objects.filter(combo=combo)
    
    for aux in combo_productos:
        combo_productos.delete()

    combo.delete()
    
    return HttpResponse(content_type = 'application/javascript; charset=utf8')