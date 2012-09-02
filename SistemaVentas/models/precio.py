from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.producto import Producto

class Precio(models.Model):
    """Precio de un producto en un determinado momento"""
    producto = models.ForeignKey(Producto)
    valor    = models.FloatField()
    fecha    = models.DateTimeField('fecha de validez', unique = True)
    
    def __unicode__(self):
        return self.producto.nombre+" "+str(self.valor)+" Bfs" #self.fecha.strftime("%d-%m-%Y : %I %p")

    def resumen(self):
        return {
                    'producto'  : self.producto.resumen(),
                    'valor'     : float(self.valor),
                    'fecha'     : self.fecha.isoformat()
                }
    
    class Meta:
        app_label = 'SistemaVentas' 
        ordering = ['-fecha']
