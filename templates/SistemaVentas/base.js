function ayuda(dirPag, tipoPag){
	//Se crea el formulario:
    var form = new Element("FORM", {'method':"POST", 'action': dirPag});
    form.innerHTML = contexto;
    
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "tipo", 'value' : tipoPag}));
    form.submit();
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

Ajax.Base.prototype.initialize = Ajax.Base.prototype.initialize.wrap(
    function (callOriginal, options) {
        var headers = options.requestHeaders || {};
        headers["X-CSRFToken"] = getCookie("csrftoken");
        options.requestHeaders = headers;
        return callOriginal(options);
    }
);