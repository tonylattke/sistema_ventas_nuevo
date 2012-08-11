/**
 * @class
 * @inherits DisparadorDeEventos
 */
var ConfPago = Class.create(DisparadorDeEventos, {
    /**
     * @constructor
     */
    initialize : function($super, /**float*/ efectivo, /**float*/ donacion, /**float*/ saldo, /**float*/ recarga) {
        $super();
        
        //Eventos:
        this.CAMBIO_EFECTIVO = "CAMBIO_EFECTIVO";
        this.CAMBIO_DONACION = "CAMBIO_DONACION";
        this.CAMBIO_SALDO    = "CAMBIO_SALDO";
        this.CAMBIO_RECARGA  = "CAMBIO_RECARGA";
        
        //Getter y Setter:
        this.__defineGetter__("efectivo",function(){return this._efectivo;});
        this.__defineGetter__("donacion",function(){return this._efectivo;});
        this.__defineGetter__("saldo",function(){return this._efectivo;});
        this.__defineGetter__("recarga",function(){return this._efectivo;});
        
         this.__defineSetter__("efectivo",
            function(val){
                this._efectivo = val;
                this.disparar(new Evento(this.CAMBIO_EFECTIVO, this));
            }
        );
            
        this.__defineSetter__("donacion",
            function(val){
                this._donacion = val;
                this.disparar(new Evento(this.CAMBIO_DONACION, this));
            }
        );
            
        this.__defineSetter__("saldo",
            function(val){
                this._saldo = val;
                this.disparar(new Evento(this.CAMBIO_SALDO, this));
            }
        );
            
        this.__defineSetter__("recarga",
            function(val){
                this._recarga = val;
                this.disparar(new Evento(this.CAMBIO_RECARGA, this));
            }
        );
        
        //Campos:
        this.efectivo = efectivo;
        this.donacion = donacion;
        this.saldo    = saldo;
        this.recarga  = recarga;
        
        
    }
});


