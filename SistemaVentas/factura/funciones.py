from SistemaVentas.models import *
from django.db.models  import *


def valor_o_cero(valor):
    if(valor == None): return 0;
    else: return valor;