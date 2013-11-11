from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.deudaCombo.views',
    url(r'^get/$'               , 'get'     , name='obtenerDeudasCombos'),
    url(r'^post/$'              , 'post'    , name='crearDeudaCombo'),
    url(r'^put/(?P<id>\d+)$'    , 'put'     , name='actualizarDeudaCombo'),
    url(r'^delete/(?P<id>\d+)$' , 'delete'  , name='eliminarDeudaCombo'),
)
