window.onload = function () {
    document.getElementById('myModal').style.display = "block";
    document.querySelector("#myModal button").focus();
};

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

$(document).ready(function() {
    $('.next').click(function() {
        var target = $(this).attr('data-target');
        var $active = $('#' + target + ' .active');
        var $next = $active.next('.slide').length ? $active.next('.slide') : $('#' + target + ' .slide:first');

        $active.fadeOut(function() {
            $active.removeClass('active');
            $next.fadeIn().addClass('active');
        });
    });

    $('.prev').click(function() {
        var target = $(this).attr('data-target');
        var $active = $('#' + target + ' .active');
        var $prev = $active.prev('.slide').length ? $active.prev('.slide') : $('#' + target + ' .slide:last');

        $active.fadeOut(function() {
            $active.removeClass('active');
            $prev.fadeIn().addClass('active');
        });
    });
});