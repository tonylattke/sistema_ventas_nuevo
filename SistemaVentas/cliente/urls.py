from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.cliente.views',
    url(r'^get/$'               , 'get'     , name='obtenerClientes'),
    url(r'^post/$'              , 'post'    , name='crearCliente'),
    url(r'^put/(?P<id>\d+)$'    , 'put'     , name='actualizarCliente'),
    url(r'^delete/(?P<id>\d+)$' , 'delete'  , name='eliminarCliente'),
)
