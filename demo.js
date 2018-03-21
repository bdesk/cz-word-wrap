$(document).ready(function () {
    $('#demo p, #demo div').czText({debug: true});
    window.onresize = function () {
        $('#demo p, #demo div').czText('refresh');
    };
});