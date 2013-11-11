from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.combo.views',
    url(r'^get/$'               , 'get'     , name='obtenerCombos'),
    url(r'^post/$'              , 'post'    , name='crearCombo'),
    url(r'^put/(?P<id>\d+)$'    , 'put'     , name='actualizarCombo'),
    url(r'^delete/(?P<id>\d+)$' , 'delete'  , name='eliminarCombo'),
)
