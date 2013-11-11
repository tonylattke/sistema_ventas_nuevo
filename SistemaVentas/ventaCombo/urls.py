from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('SistemaVentas.ventaCombo.views',
    url(r'^get/$' , 'get' , name='obtenerVentaCombos')
)
