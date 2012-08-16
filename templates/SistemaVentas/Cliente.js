function Cliente(nombre, cedula, carnet, saldo){
    this._nombre    = nombre;
    this.get_nombre = function() { return this._nombre; };
    this.set_nombre = function(value) { this._nombre = value; };
    
    this._cedula    = cedula;
    this.get_cedula = function() { return this._cedula; };
    this.set_nombre = function(value) { this._cedula = value; };
    
    this._carnet    = carnet;
    this.get_carnet = function() { return this._carnet; };
    this.set_nombre = function(value) { this._carnet = value; };
    
    this._saldo     = saldo;
    this.get_saldo  = function() { return this._saldo; };
    this.set_nombre = function(value) { this._saldo = value; };
    
}
