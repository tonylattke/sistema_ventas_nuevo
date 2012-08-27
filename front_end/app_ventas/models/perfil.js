steal(
    'jquery/model',
    
function() {
   
$.Model('Perfil',
{
    attributes  : {
        id        : 'number',
        username  : 'string',
        firstname : 'string',
        lastname  : 'string',
        email     : 'string'
    },

    yo : function(success, error) {
        $.ajax('/perfil/get/', {
            data   : {},
            success: success,
            error  : error,
            dataType : 'json perfil.model'
        });
    }
}, {
    
});

}
);
