$(document).ready(function(){
    $('.nav-content li a').each(function(){
        if($($(this))[0].href==String(window.location))
            $(this).parent().addClass('active');
    });
})
