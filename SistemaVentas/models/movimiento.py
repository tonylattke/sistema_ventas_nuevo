from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.factura import Factura

class Movimiento(models.Model):
    """Cantidad de dinero involucrado en un movimiento de caja"""
    cantidad = models.DecimalField(max_digits=9, decimal_places=3)
    
    def __unicode__(self):
        return "Mov "+str(self.id)
    
    class Meta:
        app_label = 'SistemaVentas' 
        abstract = True;

class MovimientoVentas(Movimiento):
    """Cantidad de dinero involucrado en un movimiento de caja en una Factura"""
    TIPOS    = (
        ('E', 'Efectivo'),
        ('S', 'Saldo'   ),
        ('D', 'Donacion'),
        ('R', 'Recarga' ),
        )
    tipo     = models.CharField(max_length=1, choices = TIPOS)
    factura  = models.ForeignKey(Factura)
    
    def resumen(self):
        return {
                    'cantidad' : self.cantidad,
                    'tipo'     : self.tipo,
                    'factura'  : self.factura
                }
    
    class Meta:
        app_label = 'SistemaVentas' 
        unique_together = ('factura', 'tipo')

class MovimientoCaja(Movimiento):
    """Cantidad de dinero involucrado en un movimiento de caja"""
    TIPOS    = (
        ('P', 'Ajuste Positivo'),
        ('N', 'Ajuste Negativo'),
        ('Z', 'Retiro'         ),
        ('I', 'Ingreso'        ),
        )
    tipo     = models.CharField(max_length=1, choices = TIPOS)
    descripcion = models.TextField()
    fecha = models.DateTimeField()

    def get_descripcion(self):
        return self.descripcion

    def resumen(self):
        return {
                    'cantidad' : self.cantidad,
                    'tipo'     : self.tipo,
                    'descripcion'  : self.descripcion,
                    'fecha'  : self.fecha
                }

    class Meta:
        app_label = 'SistemaVentas' 
        ordering = ['-fecha']
