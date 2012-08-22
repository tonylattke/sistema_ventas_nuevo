from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
    url(r'^get/$'            , 'SistemaVentas.turno.views.get'),
    url(r'^post/$'           , 'SistemaVentas.turno.views.post'),
    url(r'^put/(?P<id>\d+)$' , 'SistemaVentas.turno.views.put'),
    url(r'^delete/(?P<id>\d+)$' , 'SistemaVentas.turno.views.delete')
)
