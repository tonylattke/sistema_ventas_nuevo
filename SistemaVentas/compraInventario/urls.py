from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
    url(r'^get/$'            , 'SistemaVentas.producto.views.get'),
    url(r'^post/$'           , 'SistemaVentas.producto.views.post'),
    url(r'^delete/(?P<id>\d+)$' , 'SistemaVentas.producto.views.delete'),
)
