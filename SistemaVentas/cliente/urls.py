from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
    url(r'^get/$'            , 'SistemaVentas.cliente.views.get'),
    url(r'^post/$'           , 'SistemaVentas.cliente.views.post'),
    url(r'^put/(?P<id>\d+)$' , 'SistemaVentas.cliente.views.put'),
    url(r'^delete/(?P<id>\d+)$' , 'SistemaVentas.cliente.views.delete'),
)
