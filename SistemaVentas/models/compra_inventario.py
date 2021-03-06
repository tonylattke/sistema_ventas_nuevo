from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.producto import Producto

class CompraInventario(models.Model):
    """Representa la compra de inventario de un producto en especifico"""
    producto = models.ForeignKey(Producto)
    cantidad = models.IntegerField()
    fecha    = models.DateTimeField('fecha de compra', unique = True)
    costo    = models.FloatField(null=True)
    
    def __unicode__(self):
        return str(self.cantidad)+" "+str(self.producto)

    def resumen(self):
        return {
                    'producto'  : self.producto.resumen(),
                    'cantidad'  : self.cantidad,
                    'fecha'     : self.fecha.isoformat(),
                    'costo'     : float(self.costo)
                }

    class Meta:
        app_label = 'SistemaVentas'