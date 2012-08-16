from SistemaVentas.models import *
from django.db.models  import *


def valor_o_cero(valor):
    if(valor == None): return 0;
    else: return valor;

def movimientos_recarga(fecha_inicio, fecha_fin):
    """ Suma de la cantidad de dinero recibido por recargas en un lapso de tiempo entre fecha_inicio y fecha_fin """
    return MovimientoVentas.objects.filter(factura__fecha__gte = fecha_inicio).filter(factura__fecha__lte = fecha_fin).filter(Q(tipo='R')).aggregate(r=Sum('cantidad'))['r']
    
def movimientos_caja(fecha_inicio, fecha_fin):
    """ Suma de la cantidad de dinero recibido por todas las ventas en un lapso de tiempo entre fecha_inicio y fecha_fin """
    mcaja_hoy = MovimientoCaja.objects.filter(fecha__gte = fecha_inicio).filter(fecha__lte = fecha_fin)
    return  valor_o_cero(mcaja_hoy.filter(Q(tipo='I')).aggregate(r=Sum('cantidad'))['r']) - valor_o_cero(mcaja_hoy.filter(Q(tipo='Z')).aggregate(r=Sum('cantidad'))['r'])

def movimientos_ventas(fecha_inicio, fecha_fin):
    """ Suma de la cantidad de dinero  deducido de todos los movimientos de caja en un lapso de tiempo entre fecha_inicio y fecha_fin """
    return MovimientoVentas.objects.filter(factura__fecha__gte = fecha_inicio).filter(factura__fecha__lte = fecha_fin).filter(Q(tipo='E')).aggregate(r=Sum('cantidad'))['r']

   
def movimientos_ajuste(fecha_inicio, fecha_fin):
    """ Suma de la cantidad de dinero recibido por todas las ventas en un lapso de tiempo entre fecha_inicio y fecha_fin """
    mcaja_hoy = MovimientoCaja.objects.filter(fecha__gte = fecha_inicio).filter(fecha__lte = fecha_fin)
    return  valor_o_cero(mcaja_hoy.filter(Q(tipo='P')).aggregate(r=Sum('cantidad'))['r']) + valor_o_cero(mcaja_hoy.filter(Q(tipo='N')).aggregate(r=Sum('cantidad'))['r'])

