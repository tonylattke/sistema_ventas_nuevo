from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.combo import Combo

class PrecioCombo(models.Model):
    """Precio de un combo en un determinado momento"""
    combo   = models.ForeignKey(Combo)
    valor   = models.FloatField()
    fecha   = models.DateTimeField('fecha de validez', unique = True)
    
    def __unicode__(self):
        return self.combo.nombre+" "+str(self.valor)+" Bfs" #self.fecha.strftime("%d-%m-%Y : %I %p")

    def resumen(self):
        return {
                    'combo' : self.combo.resumen(),
                    'valor' : float(self.valor),
                    'fecha' : self.fecha.isoformat()
                }
    
    class Meta:
        app_label = 'SistemaVentas' 
        ordering = ['-fecha']
