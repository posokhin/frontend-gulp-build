var $ = require('jquery');

$(document).ready(function(){

    /* reference animate */
    $('a[href^="#"]').on('click', function(e){
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        $('html,body').animate({
            scrollTop: target.offset().top - 100
        }, 1000);
    });
    /* reference animate end */

});