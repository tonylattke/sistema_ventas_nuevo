from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.movimiento import MovimientoCaja

class Turno(models.Model):
    cajero          = models.CharField(max_length=32)
    fecha_inicio    = models.DateTimeField('fecha de inicio', unique = True)
    fecha_fin       = models.DateTimeField('fecha de inicio', unique = True , null = True)
    ajuste          = models.ForeignKey(MovimientoCaja, null = True)

    class Meta:
        app_label = 'SistemaVentas' 
        unique_together = ('fecha_inicio', 'cajero')
        ordering = ['-fecha_inicio']
