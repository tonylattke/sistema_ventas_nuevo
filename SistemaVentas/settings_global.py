# Django settings for SistemaVentas project.
from os.path import join, abspath, dirname 

PROJECT_ROOT = abspath(join(dirname(__file__),'..'))
PUBLIC_DIR = join(PROJECT_ROOT, 'public')

TIME_ZONE = 'America/Caracas' #America/Sartenejas/MYS
LANGUAGE_CODE = 'es-ve'

SITE_ID = 1

USE_I18N = True
USE_L10N = True
USE_TZ = True

SESSION_EXPIRE_AT_BROWSER_CLOSE = True

MEDIA_ROOT = join(PUBLIC_DIR, 'media')
MEDIA_URL = '/media/'

STATIC_ROOT = join(PUBLIC_DIR, 'static')
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    join(PROJECT_ROOT, 'media'),
    join(PROJECT_ROOT, 'front_end')
)
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

TEMPLATE_DIRS = (
    join(PROJECT_ROOT,'templates')
)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',

    'django.middleware.transaction.TransactionMiddleware',
)

ROOT_URLCONF = 'SistemaVentas.urls'

WSGI_APPLICATION = 'SistemaVentas.wsgi.application'


INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',

    'SistemaVentas'
)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}
