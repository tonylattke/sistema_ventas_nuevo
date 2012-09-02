from django.db import models
from django.db.models  import *
#from django.conf import settings
from datetime import datetime

class Producto(models.Model):
    """Productos a la venta"""
    nombre   = models.CharField(max_length=128, unique = True)
    cantidad = models.IntegerField()
    imagen   = models.ImageField(upload_to = "Imagenes/Productos/")
    ventas   = models.IntegerField(default = 0)
    descripcion = models.CharField(max_length=128, null = True)
    proveedor = models.CharField(max_length=128, null = True)
    
    def get_nombre(self):
        return self.nombre

    def get_descripcion(self):
        return self.descripcion

    def get_proveedor(self):
        return self.proveedor

    def precio_obj(self):
        precios = self.precio_set.filter(fecha__lte = datetime.now);
        if(precios.count() > 0):
            return precios[0]
        else:
            return None

    def precio_str(self):
        return str(self.precio()).rstrip('0').rstrip('.')
    precio_str.short_description = 'Precio'

    def imagen_tag(self):
        if self.imagen:
            return '<img src="%s" width="64px" height="64px" />' % (self.imagen.url)
        else:
            return '(Sin imagen)'
    imagen_tag.short_description = 'Imagen'
    imagen_tag.allow_tags = True
    
    def __unicode__(self):
        return self.nombre
    

    def precio(self):
        precios = self.precio_set.filter(fecha__lte=datetime.now)
        if(precios.count() > 0):
            return precios[0]
        else:
            return None

    def precio_valor(self):
        precio = self.precio()
        if precio:
            return float(precio.valor)
        else:
            return 0

    def resumen(self):
        return {
                    'id'         : self.id,
                    'nombre'     : self.nombre,
                    'precio'     : self.precio_valor(),
                    'inventario' : self.cantidad,
                    'imagen'     : self.imagen.url,
                    'descripcion': self.descripcion,
                    'proveedor'  : self.proveedor
                }

    class Meta:
        app_label = 'SistemaVentas'
        ordering = ['-ventas']
