from django.db import models
from django.db.models  import *

from datetime import datetime

class Combo(models.Model):
    """Combo de productos a la venta"""
    nombre      = models.CharField(max_length=128, unique=True)
    
    def __unicode__(self):
        return self.nombre

    def precio_combo_obj(self):
        precios = self.precio_combo_set.filter(fecha__lte = datetime.now)
        if(precios.count() > 0):
            return precios[0]
        else:
            return None

    def precio_combo_str(self):
        return str(self.precio()).rstrip('0').rstrip('.')
    precio_combo_str.short_description = 'Precio'

    def precio_combo(self):
        precios = self.precio_combo_set.filter(fecha__lte=datetime.now)
        if(precios.count() > 0):
            return precios[0]
        else:
            return None

    def precio_valor(self):
        precio = self.precio_combo()
        if precio:
            return float(precio.valor)
        else:
            return 0

    def resumen(self):
        salida_productos = []
        return {
                    'id'        : self.id,
                    'nombre'    : self.nombre,
                    'precio'    : self.precio_valor(),
                }

    class Meta:
        app_label = 'SistemaVentas'