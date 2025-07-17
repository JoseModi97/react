$(document).ready(function() {
  $(".drum-pad").on("click", function() {
    const audio = $(this).children("audio")[0];
    audio.play();
    $("#display").text($(this).attr("id"));
  });

  $(document).on("keydown", function(e) {
    const key = e.key.toUpperCase();
    const audio = $("#" + key)[0];
    if (audio) {
      audio.play();
      $("#display").text($("#" + key).parent().attr("id"));
    }
  });
});
