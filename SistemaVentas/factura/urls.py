from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.factura.views',
    url(r'^get/$'               , 'get'     , name='obtenerFacturas'),
    url(r'^post/$'              , 'post'    , name='crearFactura'),
    url(r'^delete/(?P<id>\d+)$' , 'delete'  , name='eliminarFactura'),
)
