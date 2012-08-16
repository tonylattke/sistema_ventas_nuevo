function cambio_conf_pago_setted(){
    cambio_conf_pago('efectivo_txt', 'saldo_lbl', 'recarga_lbl', 'recarga_rbt', 'donacion_lbl', 'donacion_rbt');
}

function cambio_conf_pago(ef_id, saldo_id, recarga_id, recarga_choice_id, donacion_id, donacion_choice_id) {
    var dif = +$(ef_id).value - Global.compra.total,
        cero = 0;
    
    //Reseteando los valores:
    $(recarga_id).innerHTML  = cero;
    $(donacion_id).innerHTML = cero;
    $(saldo_id).innerHTML    = cero;
    
    if(dif < 0 && Global.lista_clientes[Global.cliente_actual].get_saldo() >= -dif){
        $(saldo_id).innerHTML    = -dif;
    } else if(dif != 0) {
        if($(recarga_choice_id).checked == true) $(recarga_id).innerHTML  = dif;
        else                                     $(donacion_id).innerHTML = dif;
    }
}
