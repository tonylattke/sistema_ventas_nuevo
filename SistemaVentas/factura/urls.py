from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
    url(r'^get/$'            , 'SistemaVentas.factura.views.get'),
    url(r'^post/$'           , 'SistemaVentas.factura.views.post'),
    url(r'^delete/(?P<id>\d+)$' , 'SistemaVentas.factura.views.delete'),
)
