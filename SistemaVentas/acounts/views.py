from datetime                       import *

from django.shortcuts               import render_to_response, redirect
from django.template                import RequestContext
from django.core.urlresolvers       import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth            import authenticate, login, logout
from django.utils                   import simplejson
from django.http                    import HttpResponse


def indice(request):
    if request.user.is_authenticated():

        return render_to_response('app.html', {}, context_instance=RequestContext(request))
    else:

        return render_to_response('login.html', {}, context_instance=RequestContext(request))


def loguear(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            turno = Turno(cajero=username, fecha_inicio=datetime.now(), fecha_fin=None, ajuste=None)
            turno.save()

    return redirect(reverse('index'))


@login_required(login_url='')
def desloguear(request):
    logout(request)
    return redirect(reverse('index'))


@login_required(login_url='')
def perfil(request):
    user = request.user
    resumen = {
        'id':        user.id,
        'username':  user.username,
        'firstname': user.first_name,
        'lastname':  user.last_name,
        'email':     user.email
    }

    return HttpResponse(simplejson.dumps(resumen), content_type='application/javascript; charset=utf8')
