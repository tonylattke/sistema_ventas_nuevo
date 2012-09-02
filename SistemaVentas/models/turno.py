from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.movimiento import MovimientoCaja

class Turno(models.Model):
    cajero          = models.CharField(max_length=32)
    fecha_inicio    = models.DateTimeField('fecha de inicio')
    fecha_fin       = models.DateTimeField('fecha de fin', null = True)
    ajuste          = models.ForeignKey(MovimientoCaja, null = True)

    def resumen(self):
        fecha_i = self.fecha_inicio
        fecha_f = self.fecha_fin
        if fecha_i != None:
            fecha_i = self.fecha_inicio.isoformat()
        else:
            fecha_i = None
        if fecha_f != None:
            fecha_f = self.fecha_fin.isoformat()
        else:
            fecha_f = None
        return {
                    'cajero'       : self.cajero,
                    'fecha_inicio' : fecha_i,
                    'fecha_fin'    : fecha_f,
                    'ajuste'       : self.ajuste.resumen()
                }

    class Meta:
        app_label = 'SistemaVentas' 
        unique_together = ('fecha_inicio', 'cajero')
        ordering = ['-fecha_inicio']
