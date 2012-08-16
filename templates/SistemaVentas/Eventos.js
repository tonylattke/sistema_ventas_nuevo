/**
 * @class
 *  Clase base para los objetos que disparen eventos.
 */
var DisparadorDeEventos = Class.create({
    /**
     * @constructor
     */
    initialize : function(){
        this._eventos = [];
    },
    
    /**@function
     *  Define una funcion para ser ejecutada cuando el objeto dispare un evento.
     * @param {String} tipo_evento nombre del tipo de evento a observar.
     * @param {Function} funcion referencia a la funcion que se ejecutara al ser
     * disparado el evento.
     * @return {DisparadorDeEventos } este objeto.
     */
    observar : function(/**String*/ tipo_evento, /**Function*/ funcion) /**DisparadorDeEventos*/ {
        var funciones = this._eventos[tipo_evento];
        
        if(funciones === undefined) {
            this._eventos[tipo_evento] = [funcion];
        } else {
            for(var i = 0; i < funciones.length; i++) {
                if(funciones[i] === funcion) return this;
            }
            funciones.push(funcion);
        }
        
        return this;
    },
    
    /**@function
     * Pregunta si hay funciones registradas al tipo de evento.
     * @param {String} tipo_evento nombre del tipo de evento a consultar.
     * @return {DisparadorDeEventos } este objeto.
     */
    hay_observadores : function(/**String*/ tipo_evento) {
        return this._eventos[tipo_evento] !== undefined;
    },
    
    
    /**@function
     *  Hace que una funcion deje de observar el evento.
     *  Si la funcion no esta observando ese evento entonces no hay efecto.
     * @param {String} tipo_evento nombre del tipo de evento a dejar de observar.
     * @param {Function} funcion referencia a la funcion que dejara de observar.
     * @return {DisparadorDeEventos } este objeto.
     */
    dejar_de_observar : function(/**String*/ tipo_evento, /**Function*/ funcion) /**DisparadorDeEventos*/ {
        var funciones = this._eventos[tipo_evento];
        
        if(funciones !== undefined) {
            for(var i = 0; i < funciones.length; i++) {
                if(funciones[i] === funcion) {
                    funciones.splice(i,1);
                    return this;
                }
            }
        }
        
        return this;
    },
    
    /**@function
     *  Dispara el evento especificado por el objeto "evento".
     * @param {Evento} evento objeto que disparara todas las funciones que
     * escuchen su tipo de evento.
     * @return {DisparadorDeEventos } este objeto.
     */
    disparar : function(/**Evento*/ evento) /**DisparadorDeEventos*/ {
        
        var funciones = this._eventos[evento.tipo];
        //alert(evento.tipo + " f:" + funciones + "|" + typeof(funciones));
        
        if(funciones !== undefined) {
            var mi_evento = evento;
            if(mi_evento.objeto != this) {
                mi_evento = evento.clone();
                mi_evento.objeto = this;
            }
            
            for(var i = 0; i < funciones.length; i++) {
                funciones[i](mi_evento);
            }
        }
        
        return this;
    },
    
    /**@function
     *  Hace lo mismo que disparar pero recibe como parametro el tipo del evento
     *  y se crea automaticamente el objeto evento de ese tipo.
     * @param {String} tipo_evento Tipo del evento a disparar.
     * @return {DisparadorDeEventos } este objeto.
     */
    dispararEvento : function(/**String*/ tipo_evento) /**DisparadorDeEventos*/ {
        this.disparar(new Evento(tipo_evento, this));
    }
    
});

/**
 * @class
 *  Clase base para los Eventos.
 */
var Evento = Class.create({
    /**
     * @constructor
     * @param {String} tipo nombre de este evento.
     * @param {DisparadorDeEventos} [objeto] el objeto que disparo el evento 
     * (Opcional).
     */
    initialize : function(/**String*/ tipo, /**DisparadorDeEventos*/ objeto){
        if(tipo === undefined) throw "El argumento 'tipo' es obligatorio";
        this.tipo = tipo;
        this.objeto = null || objeto;
    },
    
    /**@function
     * Clona el objeto actual.
     * @return {Evento} el nuevo objeto clonado.
     */
    clone : function() /**Evento*/ {
        return new Evento(this.tipo, this.objeto);
    }
    
});


/**
 * @class
 *  Evento que se activa cuando se cambia el campo de un disparador de eventos.
 * @inherits DisparadorDeEventos
 */
var EventoCambioDeCampo = Class.create({
    /**
     * @constructor
     * @param $super ignorar.
     * @param {String} tipo nombre de este evento.
     * @param {String} campo nombre del campo.
     * @param valor_anterior el valor del campo antes del cambio.
     * @param [valor_actual] el valor del campo despues del cambio.
     * @param {DisparadorDeEventos} [objeto] el objeto que disparo el evento 
     * (Opcional).
     */
    initialize : function($super, /**String*/ tipo, /**String*/ campo, valor_anterior, valor_actual, /**DisparadorDeEventos*/ objeto){        
        $super(tipo, objeto);
        
        this.valor_anterior = valor_anterior;
        
        if(valor_actual === undefined) {
            if(this.objeto === null) this.valor_actua = undefined;
            else                     this.valor_actual = this.objeto[this.campo];
        } else this.valor_actual = valor_actual;
        
        this.campo = campo;
        
    },
    
    /**@function
     * Clona el objeto actual.
     * @return {DisparadorDeEventos} el nuevo objeto clonado.
     */
    clone : function() /**DisparadorDeEventos*/ {
        return new EventoCambioDeCampo(this.tipo, this.campo, this.valor_anterior, this.valor_actual, this.objeto);
    }
    
});