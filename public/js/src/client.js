//Client app
$(document).ready(function(){
  var socket = io();

  socket.on('connect', function(){

    //Push the landing GIF into the screen
    $('#gif_container').empty().append('<img src="assets/gifs/lesson01.gif" width="1024" height="768" />');

  });


});
