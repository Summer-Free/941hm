$(document).ready(function(){
    $('.newactive a').each(function(){
        if($($(this))[0].href==String(window.location))
            $(this).parent().addClass('navactive');
    });
})
