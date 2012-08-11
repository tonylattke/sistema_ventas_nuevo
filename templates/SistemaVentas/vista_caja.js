function mostrar() {
    var yearre = new RegExp(/(\d{4})\/(1[0-2]|0\d)\/(0[1-9]|[1|2]\d|3[0|1])/),
        hourre = new RegExp(/(2[0-3]|1\d|0\d):([0-5]\d)/);
        
    if( yearre.test($('fi').value) &&
        yearre.test($('ff').value) &&
        hourre.test($('hi').value) &&
        hourre.test($('hf').value)
        )
    {
        var fi = yearre.exec($('fi').value),
            ff = yearre.exec($('ff').value),
            hi = hourre.exec($('hi').value),
            hf = hourre.exec($('hf').value);
        
        var fistr = String(fi[1])+String(fi[2])+String(fi[3])+String(hi[1])+String(hi[2]),
            ffstr = String(ff[1])+String(ff[2])+String(ff[3])+String(hf[1])+String(hf[2]);
        
        document.location.href = "caja/fi="+fistr+"&ff="+ffstr+"";
    } else {
        alert("Formato incorrecto.");
    }
}

function hoy(){
    var hoy = new Date(),
        d   = String(hoy.getDate()),
        m   = String(hoy.getMonth()+1);
    
    if(d.length < 2) d = "0"+d;
    if(m.length < 2) m = "0"+m;
    
    $('fi').value = hoy.getFullYear()+"/"+m+"/"+d;
    $('hi').value = "00:00";
    $('ff').value = hoy.getFullYear()+"/"+m+"/"+d;
    $('hf').value = "23:59";
}
