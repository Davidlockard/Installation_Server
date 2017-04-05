'use strict'

//Express setup
const express = require('express');
const app = express();

//HTTP Server setup
const http = require('http').createServer(app);

//Port and listeners
let port = process.env.PORT || 2308;
let server = app.listen(port);

//I hate templating, so I prefer ejs
const ejs = require('ejs');

//twilio
let twilioCred = {
  sid: 'AC0615aa63cbef5e775dad5668fee9be48',
  auth: 'f919c2750049933dc2943d987dc2c089'
}
const twilio = require('twilio');
let client = new twilio.RestClient(twilioCred.sid, twilioCred.auth);

//Socket.io
const io = require('socket.io').listen(server);

//App config
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view-engine', 'html');

//Setup the public space
app.use(express.static(__dirname + '/public'));

console.log("The server is running on localhost:" + port);

//Socket - manages our communications
io.on('connection' client=>{

  console.log(client);

  client.messages.create({
    body: 'Hello from Node',
    to: '+12345678901',  // Text this number
    from: '+12345678901' // From a valid Twilio number
  }, function(err, message) {
    console.log(message.sid);
  });

});

//Router - manages our routes

app.get('/projector', (req, res)=>{

    res.render('projector.html');

});

app.get('/*', (req, res)=>{

    res.render('404.html')

});
