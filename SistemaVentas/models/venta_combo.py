from django.db import models
from django.db.models  import *

from SistemaVentas.models.combo import Combo
from SistemaVentas.models.precio import Precio
from SistemaVentas.models.factura import Factura
from SistemaVentas.models.combo_producto import ComboProducto

class VentaCombo(models.Model):
    """Cantidad de combos vendidos en una factura"""
    combo    = models.ForeignKey(Combo)
    factura  = models.ForeignKey(Factura)
    cantidad = models.IntegerField()
    precio   = models.ForeignKey(Precio)
    
    def __unicode__(self):
        return self.combo.nombre
    
    def usuario(self): 
        return self.factura.usuario

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
                    'precio'   : self.precio.resumen(),
                    'cantidad' : self.cantidad,
                    'factura'  : self.factura.resumen()
                }

    class Meta:
        app_label = 'SistemaVentas' 
        unique_together = ('combo', 'factura',)