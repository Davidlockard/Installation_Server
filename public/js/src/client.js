//Client app
$(document).ready(function(){
  var socket = io();

  socket.on('connect', function(){

    //Push the landing GIF into the screen
    $('#gif_container').empty().append('<img src="assets/gifs/lesson01.gif" width="1024" height="768" />');

  });

  socket.on('newName', function(data){
    var keys = Object.keys(data);
    $('#gif_container').fadeOut(250, function(){
      $('#hello_name').empty().append('Hello ' + data.name);
      $('#gif_container').empty().append('<img src="assets/gifs/' + data[keys[0]] + '.gif" width="1024" height="768" />')
      $('#gif_container').fadeIn(250);
    })
  })


});
