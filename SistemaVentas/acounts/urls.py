from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
    
    url(r'^(?P<mensaje>\d*)$'      , 'SistemaVentas.acounts.views.index'),
    url(r'^_login/$'                , 'SistemaVentas.acounts.views.loguear', name = 'login'),
    url(r'^_logout$'               , 'SistemaVentas.acounts.views.desloguear'),
    url(r'^vender$'                , 'SistemaVentas.acounts.views.ver_vender'),
    url(r'^comprar_do$'            , 'SistemaVentas.acounts.views.comprar'),
    url(r'^compra_ok$'             , 'SistemaVentas.acounts.views.compra_ok'),
    url(r'^inventario$'            , 'SistemaVentas.acounts.views.ver_inventario'),
    url(r'^inventario/compra$'     , 'SistemaVentas.acounts.views.compra_inventario'),
	url(r'^inventario/modificar$'  , 'SistemaVentas.acounts.views.modificar_inventario'),
    url(r'^usuarios$'              , 'SistemaVentas.acounts.views.ver_usuarios'),
    url(r'^caja$'                  , 'SistemaVentas.acounts.views.ver_caja_hoy'),
    url(r'^caja/abrir$'            , 'SistemaVentas.acounts.views.ver_caja_abrir'),
    url(r'^caja/cerrar$'           , 'SistemaVentas.acounts.views.ver_caja_cerrar'),
    url(r'^movimientos$'           , 'SistemaVentas.acounts.views.ver_movimientos_hoy'),
    url(r'^movimientos/fi=(?P<fi>\d{12})&ff=(?P<ff>\d{12})$'         
                                               , 'SistemaVentas.acounts.views.ver_movimientos'),
    url(r'^caja/fi=(?P<fi>\d{12})&ff=(?P<ff>\d{12})$'
                                               , 'SistemaVentas.acounts.views.ver_caja'),

    url(r'^eliminar_usuario/(?P<id_cedula>[VE]\d{8})$', 'SistemaVentas.acounts.views.eliminar_usuario'),
    url(r'^eliminar_producto/(?P<prod_id>\d+)$', 'SistemaVentas.acounts.views.eliminar_producto_inventario'),

    url(r'^nuevo_usuario_do$'		 , 'SistemaVentas.acounts.views.nuevo_cliente'),
    url(r'^nuevo_producto_do$'		 , 'SistemaVentas.acounts.views.nuevo_producto'),
    url(r'^nuevo_movimiento_do$'	 , 'SistemaVentas.acounts.views.nuevo_movimiento'),
    url(r'^inventario/compra_do$'	 , 'SistemaVentas.acounts.views.compra_inventario_do'),
	url(r'^inventario/modificar_do$' , 'SistemaVentas.acounts.views.modificar_inventario_do'),
	url(r'^caja/abrir_do$'		 	 , 'SistemaVentas.acounts.views.abrir_caja'),
	url(r'^caja/cerrar_do$'		 	 , 'SistemaVentas.acounts.views.cerrar_caja'),

    url(r'^ventas/ayuda$'      			 , 'SistemaVentas.acounts.views.ver_controlador_ayuda'),
    url(r'^movimientos/ayuda$'			 , 'SistemaVentas.acounts.views.ver_controlador_ayuda'),
    url(r'^usuarios/ayuda$'    			 , 'SistemaVentas.acounts.views.ver_controlador_ayuda'),
    url(r'^inventario/ayuda$' 			 , 'SistemaVentas.acounts.views.ver_controlador_ayuda'),
    url(r'^inventario/modificar/ayuda$'  , 'SistemaVentas.acounts.views.ver_controlador_ayuda'),
    url(r'^inventario/compra/ayuda$'	 , 'SistemaVentas.acounts.views.ver_controlador_ayuda'),
    url(r'^caja/ayuda$'   				 , 'SistemaVentas.acounts.views.ver_controlador_ayuda'),
    url(r'^caja/abrir/ayuda$'   		 , 'SistemaVentas.acounts.views.ver_controlador_ayuda'),
    url(r'^caja/cerrar/ayuda$'   		 , 'SistemaVentas.acounts.views.ver_controlador_ayuda'),
    

    #AJAX:
    url(r'^buscar_productos$'   		 , 'SistemaVentas.acounts.views.buscar_productos'),
    url(r'^buscar_usuario$'   		 , 'SistemaVentas.acounts.views.buscar_usuario'),
)
