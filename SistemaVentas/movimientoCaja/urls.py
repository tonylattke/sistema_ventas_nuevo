from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.movimientoCaja.views',
    url(r'^get/$'               , 'get'     , name='obtenerMovimientosCaja'),
    url(r'^post/$'              , 'post'    , name='CrearMovimientoCaja'),
    url(r'^put/(?P<id>\d+)$'    , 'put'     , name='actualizarMovimientoCaja'),
    url(r'^delete/(?P<id>\d+)$' , 'delete'  , name='eliminarMovimientoCaja'),
)
