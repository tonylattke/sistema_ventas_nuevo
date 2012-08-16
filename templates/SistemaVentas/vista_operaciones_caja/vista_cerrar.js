$import("/templates/ventas_app/helpers.js");

function calcular_monedas() {
    var res = 
        soc($('100'))*100 + soc($('50'))*50   + soc($('20'))*20   + soc($('10'))*10   + soc($('5'))*5 + soc($('2'))*2 +    
        soc($('1'))*1     + soc($('0.5'))*0.5 + soc($('0.25'))*0.25 + soc($('0.1'))*0.1 + soc($('0.05'))*0.05 + soc($('0.125'))*0.125 + soc($('0.01'))*0.01;
    res = Math.round(1000*res)/1000;
    
    $('total_caja').update(res);
    
    $('dif_totales').update(Math.round(1000*(res - parseFloat($("total_teorico").innerHTML.replace(',','.'))))/1000 );
    
}

function soc(val) {
    if( isNaN(parseInt(val.value)) ) return 0;
    else                             return parseInt(val.value);
}

function validarDato(val){

	if(val == ""){
		return 0;
	}

	if(isDecimal(val)){
		return val;
	}

	return 0;
}

function realizar() {
	//Se crea el formulario:
    var form = new Element("FORM", {'method':"POST", 'action': "caja/cerrar_do"});
    form.innerHTML = contexto;

	var res = soc($('100'))*100 + soc($('50'))*50   + soc($('20'))*20   + soc($('10'))*10   + soc($('5'))*5 + soc($('2'))*2 + soc($('1'))*1 + soc($('0.5'))*0.5 + soc($('0.25'))*0.25 + soc($('0.1'))*0.1 + soc($('0.05'))*0.05 + soc($('0.125'))*0.125 + soc($('0.01'))*0.01;
    res = Math.round(1000*res)/1000;

    var dif = Math.round(1000*(res - parseFloat($("total_teorico").innerHTML.replace(',','.'))))/1000,
        j100 	= $("100"),
		j50  	= $("50"),
		j20  	= $("20"),
		j10  	= $("10"),
		j5  	= $("5"),
		j2  	= $("2"),
		j1  	= $("1"),
		j05  	= $("0.5"),
		j025  	= $("0.25"),
		j0125 	= $("0.125"),
		j01  	= $("0.1"),
		j005  	= $("0.05"),
		j001  	= $("0.01");

	j100 	= validarDato(j100.value);
	j50 	= validarDato(j50.value);
	j20 	= validarDato(j20.value);
	j10 	= validarDato(j10.value);
	j5 		= validarDato(j5.value);
	j2 		= validarDato(j2.value);
	j1 		= validarDato(j1.value);
	j05 	= validarDato(j05.value);
	j025 	= validarDato(j025.value);
	j0125 	= validarDato(j0125.value);
	j01 	= validarDato(j01.value);
	j005 	= validarDato(j005.value);
	j001 	= validarDato(j001.value);

    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d100", 'value' : j100}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d50", 'value' : j50}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d20", 'value' : j20}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d10", 'value' : j10}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d5", 'value' : j5}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d2", 'value' : j2}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d1", 'value' : j1})); 
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d0.5", 'value' : j05}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d0.25", 'value' :j025}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d0.125", 'value' : j0125}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d0.1", 'value' : j01}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d0.05", 'value' : j005}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "d0.01", 'value' : j001}));
    form.insert(new Element("INPUT",{'type' : 'hiden', 'name' : "dif_totales", 'value' : dif }));

	//Se envia un mensaje de confirmacion:
    var conf = confirm("¿Esta seguro que deseas realizar este cierre de caja?");

    if(conf) form.submit();
}
