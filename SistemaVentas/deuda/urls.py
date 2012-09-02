from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.deuda.views',
    url(r'^get/$'               , 'get'     , name='obtenerDeudas'),
    url(r'^post/$'              , 'post'    , name='crearDeuda'),
    url(r'^put/(?P<id>\d+)$'    , 'put'     , name='actualizarDeuda'),
    url(r'^delete/(?P<id>\d+)$' , 'delete'  , name='eliminarDeuda'),
)
