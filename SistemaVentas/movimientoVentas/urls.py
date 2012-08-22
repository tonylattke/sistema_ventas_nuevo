from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
    url(r'^get/$'            , 'SistemaVentas.movimientoVentas.views.get'),
    url(r'^post/$'           , 'SistemaVentas.movimientoVentas.views.post'),
    url(r'^put/(?P<id>\d+)$' , 'SistemaVentas.movimientoVentas.views.put'),
    url(r'^delete/(?P<id>\d+)$' , 'SistemaVentas.movimientoVentas.views.delete'),
)
