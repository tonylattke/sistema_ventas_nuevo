from django.db import models
from django.db.models  import *

class Combo(models.Model):
    """Combo de productos a la venta"""
    nombre      = models.CharField(max_length=128, unique=True)
    
    def __unicode__(self):
        return self.nombre

    def resumen(self):
        salida_productos = []
        return {
                    'id'        : self.id,
                    'nombre'    : self.nombre,
                }

    class Meta:
        app_label = 'SistemaVentas'