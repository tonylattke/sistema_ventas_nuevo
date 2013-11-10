from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

from SistemaVentas.models.usuario import Usuario
from SistemaVentas.models.combo import Combo

class DeudaCombo(models.Model):
    """Representa la deuda de un usuario"""
    combo    = models.ForeignKey(Combo)
    cantidad = models.IntegerField()
    usuario  = models.ForeignKey(Usuario)
    
    def __unicode__(self):
        return str(self.usuario) + " debe " + str(self.combo)

    def resumen(self):
        salida_productos = []
        combo_productos  = ComboProducto.objects.filter(combo=self.combo)
        for aux in combo_productos:
            combo_producto = {
                                'producto'  : aux.producto.resumen(),
                                'cantidad'  : aux.cantidad,
                            }
            salida_productos.append(combo_producto)
        salida_combo = {
                        'id'        : self.combo.id,
                        'nombre'    : self.combo.nombre,
                        'productos' : salida_productos,
                    }
        return {
                    'combo'    : salida_combo,
                    'cantidad' : self.cantidad,
                    'usuario'  : self.usuario.resumen()
                }

    class Meta:
        app_label = 'SistemaVentas'        
        unique_together = ('combo', 'usuario',)
        ordering = ['usuario']
