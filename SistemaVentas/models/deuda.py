from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.usuario import Usuario
from SistemaVentas.models.producto import Producto

class Deuda(models.Model):
    """Representa la deuda de un usuario"""
    producto = models.ForeignKey(Producto)
    cantidad = models.IntegerField()
    usuario  = models.ForeignKey(Usuario)
    
    def __unicode__(self):
        return str(self.usuario)+" "+str(self.producto)

    def resumen(self):
        return {
                    'producto'     : self.producto,
                    'cantidad'     : self.cantidad,
                    'usuario'     : self.usuario
                }

    class Meta:
        app_label = 'SistemaVentas'        
        unique_together = ('producto', 'usuario',)
        ordering = ['usuario']
