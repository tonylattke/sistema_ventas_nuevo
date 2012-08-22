from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
    url(r'^get/$'            , 'SistemaVentas.movimientoCaja.views.get'),
    url(r'^post/$'           , 'SistemaVentas.movimientoCaja.views.post'),
    url(r'^put/(?P<id>\d+)$' , 'SistemaVentas.movimientoCaja.views.put'),
    url(r'^delete/(?P<id>\d+)$' , 'SistemaVentas.movimientoCaja.views.delete'),
)
