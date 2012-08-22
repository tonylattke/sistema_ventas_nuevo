from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from SistemaVentas.acounts import urls as accounts_urls
from SistemaVentas.producto import urls as producto_urls
from SistemaVentas.cliente import urls as cliente_urls
from SistemaVentas.deuda import urls as deuda_urls
from SistemaVentas.movimientoCaja import urls as movimiento_caja_urls
from SistemaVentas.movimientoVentas import urls as movimiento_ventas_urls
from SistemaVentas.factura import urls as factura_urls
from SistemaVentas.ventaProducto import urls as venta_producto_urls
from SistemaVentas.turno import urls as turno_urls
from SistemaVentas.compraInventario import urls as compra_inventario_urls

admin.autodiscover()

urlpatterns = patterns('',
    url(r'' , include(accounts_urls)),
    url(r'^producto/' , include(producto_urls)),
    url(r'^cliente/' , include(cliente_urls)),
    url(r'^deuda/' , include(deuda_urls)),
    url(r'^movimientoCaja/' , include(movimiento_caja_urls)),
    url(r'^movimientoVentas/' , include(movimiento_ventas_urls)),
    url(r'^factura/' , include(factura_urls)),
    url(r'^ventaProducto/' , include(venta_producto_urls)),
    url(r'^turno/' , include(turno_urls)),
    url(r'^compraInventario/' , include(compra_inventario_urls)),
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
    
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
        
        url(r'^templates/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.TEMPLATE_DIRS[0],
        }),
    )
