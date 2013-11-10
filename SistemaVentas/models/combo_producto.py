from django.db import models
from django.db.models  import *

from SistemaVentas.models.producto import Producto
from SistemaVentas.models.combo import Combo

class ComboProducto(models.Model):
    """Cantidad de un mismo producto en combo"""
    producto    = models.ForeignKey(Producto)
    combo       = models.ForeignKey(Combo)
    cantidad    = models.IntegerField()
    
    def __unicode__(self):
        return self.combo.nombre + ' ' + self.producto.nombre + ' ' + str(self.cantidad)

    def resumen(self):
        return {
                    'producto'  : self.producto.resumen(),
                    'combo'     : self.combo.resumen(),
                    'cantidad'  : self.cantidad,
                }

    class Meta:
        app_label = 'SistemaVentas'
        unique_together = ('producto', 'combo',)