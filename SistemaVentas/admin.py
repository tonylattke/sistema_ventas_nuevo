from SistemaVentas.models import *
from django.contrib import admin
#from django.utils.translation import ugettext_lazy as _
#from django.contrib.admin import SimpleListFilter
#from django.db.models import Avg, StdDev, Min, Max


#Pasar a otro archivo:
""" Para Django 1.4 -.-
class filtro_de_valores(SimpleListFilter):
    title = _('Saldo')

    # Parameter for the filter that will be used in the URL query.
    parameter_name = 'saldo'

    def lookups(self, request, model_admin):
        qs = model_admin.queryset(request)
        data = qs.aggregate(min = Min('saldo') , max = Max('saldo'), avg = Avg('saldo'), std = StdDev('saldo') )
        sets = (
            (data['min']              , data['avg'] - data['std']),
            (data['avg'] - data['std'], data['avg']              ), 
            (data['avg']              , data['avg'] + data['std']),
            (data['avg'] + data['std'], data['max']              ),
            )
        for s in sets:
            yield ( s , _( 'De ' + str(s[0]) + ' a ' + str(s[1]) ) )

    def queryset(self, request, queryset):
        val = self.value()
        return queryset.filter(saldo__gte = val[0], saldo__lt = val[1])
"""



class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('nombre','cedula','carnet', 'fecha_to_num','val_to_num')
    list_filter = ['fecha']  #'filtro_de_valores']
    search_fields = ['nombre','cedula','carnet']
    date_hierarchy = 'fecha'
    
    def val_to_num(self, usr):
        return str(usr.saldo)
    val_to_num.short_description = 'Saldo'
    
    def fecha_to_num(self, usr):
        return usr.fecha.strftime("%d-%m-%Y")
    fecha_to_num.short_description = 'Inscripcion'

admin.site.register(Usuario, UsuarioAdmin)


class PrecioInline(admin.TabularInline):
    model = Precio
    extra = 0

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio_str','cant_to_num', 'imagen_tag')
    inlines = [PrecioInline]
    
    def cant_to_num(self, prod):
        return str(prod.cantidad)
    cant_to_num.short_description = 'En Inventario'

admin.site.register(Producto, ProductoAdmin)    

admin.site.register(Precio)

admin.site.register(Turno)

class VentaProductoInline(admin.TabularInline):
    model = VentaProducto
    extra = 0

class VentaComboInline(admin.TabularInline):
    model = VentaCombo
    extra = 0

class MovimientoVentasInline(admin.TabularInline):
    model = MovimientoVentas
    extra = 0

class FacturaAdmin(admin.ModelAdmin):
    list_display = ('fact_id', 'usuario_nombre', 'fact_fecha')
    list_filter = ['usuario']
    date_hierarchy = 'fecha'
    inlines = [VentaProductoInline, VentaComboInline, MovimientoVentasInline]    

    def usuario_nombre(self, fact): return fact.usuario.nombre
    usuario_nombre.short_description = "A nombre de"
    
    def fact_id(self, fact):
        return str(fact.id)
    fact_id.short_description = '#'
    
    def fact_fecha(self, fact):
        return fact.fecha.strftime("%x")
    fact_fecha.short_descripcion = "Fecha"

admin.site.register(Factura, FacturaAdmin)

class VentaProductoAdmin(admin.ModelAdmin):
    list_display = ('producto', 'fecha', 'cantidad', 'usuario')
    
    list_filter = ['producto', 'factura__fecha']

    def usuario(self, vprod): return vprod.factura.usuario.nombre

    def fecha(self, vprod): return vprod.factura.fecha.strftime("%x")

admin.site.register(VentaProducto, VentaProductoAdmin)

admin.site.register(MovimientoVentas)
admin.site.register(MovimientoCaja)
admin.site.register(CompraInventario)

admin.site.register(Combo)
admin.site.register(ComboProducto)
admin.site.register(PrecioCombo)

class VentaComboAdmin(admin.ModelAdmin):
    list_display = ('combo', 'fecha', 'cantidad', 'usuario')
    
    list_filter = ['combo', 'factura__fecha']

    def usuario(self, vprod): return vprod.factura.usuario.nombre

    def fecha(self, vprod): return vprod.factura.fecha.strftime("%x")

admin.site.register(VentaCombo, VentaComboAdmin)

admin.site.register(Deuda)
admin.site.register(DeudaCombo)