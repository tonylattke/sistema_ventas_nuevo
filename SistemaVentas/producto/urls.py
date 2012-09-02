from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.producto.views',
    url(r'^get/$'               , 'get'     , name='obtenerProductos'),
    url(r'^post/$'              , 'post'    , name='crearProducto'),
    url(r'^put/(?P<id>\d+)$'    , 'put'     , name='actualizarProducto'),
    url(r'^delete/(?P<id>\d+)$' , 'delete'  , name='eliminarProducto'),
)
