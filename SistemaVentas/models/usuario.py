from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

class Usuario(models.Model):
    """Usuario que usa el sistema"""
    TIPOS    = (
        ('A', 'Administrador'),
        ('U', 'Usuario'      ),
        ('C', 'Cliente'      ),
        )
    cedula   = models.IntegerField(max_length=8, primary_key = True)
    carnet   = models.CharField(max_length=8, unique = True)
    nombre   = models.CharField(max_length=32)
    fecha    = models.DateTimeField('fecha de inscripcion')
    tipo     = models.CharField(max_length=1, choices=TIPOS)
    saldo    = models.DecimalField(max_digits=9, decimal_places=2)
    
    def saldo_str(self): return str(self.saldo).rstrip('0').rstrip('.')
    saldo_str.short_description = 'Saldo'
    
    def aporte(self):
        movs = MovimientoVentas.objects.filter(factura__usuario = self).exclude(tipo='D').exclude(tipo='R').aggregate(r=Sum('cantidad'));
        return movs['r']
        
    def aporte_str(self): return str(self.aporte()).rstrip('0').rstrip('.')
    aporte_str.short_description = 'Aporte'
    
    def __unicode__(self):
        return self.nombre

    def resumen(self):
        return {
                    'cedula'     : self.cedula,
                    'carnet'     : self.carnet,
                    'nombre'     : self.nombre,
                    'saldo'      : self.saldo
                }

    class Meta:
        app_label = 'SistemaVentas' 
        ordering = ['fecha']
