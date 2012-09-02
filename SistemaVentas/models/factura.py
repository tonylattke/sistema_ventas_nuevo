from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.usuario import Usuario

class Factura(models.Model):
    """Representa un movimiento de caja y productos a un usuario en una fecha y tiene asociados ventas de productos y Movimientos de caja"""
    fecha    = models.DateTimeField('fecha de expedicion')
    usuario  = models.ForeignKey(Usuario, null = True)
    
    def total(self):
        return self.ventaproducto_set.aggregate(r=Sum('precio__valor'))['r']
    
    def __unicode__(self):
        return str(self.id)

    def resumen(self):
        return {
                    'id'        : self.id,
                    'fecha'     : self.fecha.isoformat(),
                    'usuario'   : self.usuario.resumen()
                }

    class Meta:
        app_label = 'SistemaVentas' 
        ordering = ['-fecha']
