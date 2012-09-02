from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.ventaProducto.views',
    url(r'^get/$' , 'get' , name='obtenerVentaProductos')
)
