function calcular_monedas() {
    var res = 
        soc($('100'))*100 + soc($('50'))*50   + soc($('20'))*20   + soc($('10'))*10   + soc($('5'))*5 + soc($('2'))*2 +    
        soc($('1'))*1     + soc($('0.5'))*0.5 + soc($('0.25'))*0.25 + soc($('0.1'))*0.1 + soc($('0.05'))*0.05 + soc($('0.125'))*0.125 + soc($('0.01'))*0.01;
    res = Math.round(1000*res)/1000;
    
    $('total_caja').update(res);
    
}

function soc(val) {
    if( isNaN(parseInt(val.value)) ) return 0;
    else                             return parseInt(val.value);
}

function realizar() {
    
	//Se crea el formulario:
    var form = new Element("FORM", {'method':"POST", 'action': "caja/abrir_do"});
    form.innerHTML = contexto;

    var t = Math.round(1000*(parseFloat($("total_caja").innerHTML.replace(',','.'))))/1000;

    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "total", 'value' : t}));

	//Se envia un mensaje de confirmacion:
    var conf = confirm("¿Esta seguro que deseas la realizar de caja?");

    if(conf) form.submit();
}
