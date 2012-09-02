from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.producto import Producto
from SistemaVentas.models.precio import Precio
from SistemaVentas.models.factura import Factura

class VentaProducto(models.Model):
    """Cantidad de productos vendidos en una factura"""
    producto = models.ForeignKey(Producto)
    factura  = models.ForeignKey(Factura)
    cantidad = models.IntegerField()
    precio   = models.ForeignKey(Precio)
    
    def __unicode__(self):
        return self.producto.nombre
    
    def usuario(self): return self.factura.usuario

    def resumen(self):
        return {
                    'producto' : self.producto.resumen(),
                    'precio'   : self.precio.resumen(),
                    'cantidad' : self.cantidad,
                    'factura'  : self.factura.resumen()
                }

    class Meta:
        app_label = 'SistemaVentas' 
        unique_together = ('producto', 'factura',)