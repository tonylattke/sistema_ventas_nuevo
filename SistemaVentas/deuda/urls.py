from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
    url(r'^get/$'            , 'SistemaVentas.deuda.views.get'),
    url(r'^post/$'           , 'SistemaVentas.deuda.views.post'),
    url(r'^put/(?P<id>\d+)$' , 'SistemaVentas.deuda.views.put'),
    url(r'^delete/(?P<id>\d+)$' , 'SistemaVentas.deuda.views.delete'),
)
