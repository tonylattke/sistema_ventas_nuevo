steal(
    'jquery/controller'
).then(
function() {
    
    $.Controller("Routing",
    /** @Static */ {
        
    }, /** @Prototype */ {
        
        init : function() {
            //$("body").html("<h1>JSMVC It Works! ;D</h1>");
        }
    });

    new Routing($("body"));
});
