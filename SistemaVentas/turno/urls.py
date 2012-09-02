from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.turno.views',
    url(r'^get/$'               , 'get'     , name='obtenerTurnos'),
    url(r'^post/$'              , 'post'    , name='crearTurno'),
    url(r'^put/(?P<id>\d+)$'    , 'put'     , name='actualizarTurno'),
    url(r'^delete/(?P<id>\d+)$' , 'delete'  , name='eliminarTurno')
)
