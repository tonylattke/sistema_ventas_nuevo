from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.compraInventario.views',
    url(r'^get/$'               , 'get'     , name='obtenerComprasInventario'),
    url(r'^post/$'              , 'post'    , name='crearCompraInventario'),
    url(r'^delete/(?P<id>\d+)$' , 'delete'  , name='eliminarCompraInventario'),
)
