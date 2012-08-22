from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
    url(r'^get/$'            , 'SistemaVentas.compraInventario.views.get'),
    url(r'^post/$'           , 'SistemaVentas.compraInventario.views.post'),
    url(r'^delete/(?P<id>\d+)$' , 'SistemaVentas.compraInventario.views.delete'),
)
