const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
if (!!isReduced) {
} else {
  window.onload = function () {
    document.getElementById('myModal').style.display = "block";
    document.querySelector("#myModal button").focus();
  };

  function closeModal() {
    document.getElementById('myModal').style.display = "none";
  }

  $(document).ready(function () {
    $('.next').click(function () {
      var target = $(this).attr('data-target');
      var $active = $('#' + target + ' .active');
      var $next = $active.next('.slide').length ? $active.next('.slide') : $('#' + target + ' .slide:first');

      $active.fadeOut(function () {
        $active.removeClass('active');
        $next.fadeIn().addClass('active');
      });
    });

    $('.prev').click(function () {
      var target = $(this).attr('data-target');
      var $active = $('#' + target + ' .active');
      var $prev = $active.prev('.slide').length ? $active.prev('.slide') : $('#' + target + ' .slide:last');

      $active.fadeOut(function () {
        $active.removeClass('active');
        $prev.fadeIn().addClass('active');
      });
    });


    $(".likes_list").each(function () {

      var $currentList = $(this);
      var $items = $currentList.find('li');

      // Determine necessary clones
      var necessaryClones = Math.ceil($currentList.parent().width() / ($items.width() * $items.length));
      var windowSize = $(window).width();
      var isPause = false;

      // Only clone for larger screens
      if (windowSize > 800) {
        for (var i = 0; i < necessaryClones; i++) {
          $currentList.append($items.clone());
        }

        function scrollList() {
          var pos = $currentList.scrollLeft();

          $currentList.animate(
            { scrollLeft: pos + $items.first().outerWidth() },  // Scroll the width of a single item
            2000,  // Speed
            "linear",
            function () {
              // When animation is completed, check if we're at the end of the list...
              if ($currentList.scrollLeft() >= ($items.first().outerWidth() * $items.length * necessaryClones)) {
                // Reset scroll position to 0
                $currentList.scrollLeft(0);
              }
              // Continue the scrolling animation
              scrollList();
            }
          );
        }
        scrollList();

        $currentList.hover(
          function () {   // mouse enters the .likes_list
            isPause = true;
            $currentList.stop();   // stop the animation
          },
          function () {   // mouse leaves the .likes_list
            isPause = false;
            scrollList();   // restart the animation
          }
        ).on('focus', function () {
          isPause = true;
          $currentList.stop();
        }).on('blur', function () {
          isPause = false;
          scrollList();
        });

      }


    });

  });


}