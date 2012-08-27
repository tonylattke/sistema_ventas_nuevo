from django.conf.urls.defaults import patterns, url


urlpatterns = patterns('SistemaVentas.acounts.views',
    url(r'^$',        'indice',     name='index'),
    url(r'^_login/$', 'loguear',    name='login'),
    url(r'^_logout/$', 'desloguear', name='logout'),

    url(r'^perfil/get/$',  'perfil'),
)
