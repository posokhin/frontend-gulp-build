/* form-fields animate */
function placeholderAnimate() {
    $(this).siblings('.form__field-placeholder').addClass('active');
}
var inputs = document.querySelectorAll('.form__field input');
if (inputs.length) {
    inputs.forEach(function (el) {
        el.addEventListener('focus', placeholderAnimate);
        el.addEventListener('blur', function () {
            if (this.value == '') {
                $(this).siblings('.form__field-placeholder').removeClass('active');
            }
        });
    });
}
/* form-fields animate end */


/* tabs */
$('.faq__tabs').on('click', '.faq__tabs-item:not(.faq__tabs-item.active)', function () {
    $(this).addClass('active').siblings().removeClass('active').closest('.faq__row').find('.faq__tabs-content').removeClass('active').animate({
        opacity: 0
    }, 300).eq($(this).index()).addClass('active').animate({
        opacity: 1
    }, 300);
    setActiveLine();
});
/* tabs end */