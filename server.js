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
let twilioClient = new twilio.RestClient(twilioCred.sid, twilioCred.auth);

const bodyParser = require('body-parser');

//Socket.io
const io = require('socket.io').listen(server);

let Names = {
  or: {
    'lesson02',
    'lesson03'
  },
  david: {
    'lesson04',
    'lesson05'
  }
  shir: {
    'lesson06',
    'lesson07'
  }
}

let nameNotFound = 'sorry';

//App config
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view-engine', 'html');

//Setup the public space
app.use(express.static(__dirname + '/public'));

//setup the app to use body parser for HTTP requests
app.use(bodyParser.urlencoded({extended: false}));

console.log("The server is running on localhost:" + port);





//Socket - manages our communications
io.on('connection', client=>{

  console.log('The projector is connected');


  //Projector disconnected
  client.on('disconnect', ()=>{

    console.log('The projector disconnected');

  });

});





//Router - manages our routes

app.get('/projector', (req, res)=>{

    res.render('projector.html');

});

//Handels reciving messages from twilio
app.post('/message', (req, res)=>{

  console.log(req.body.Body.toLowerCase());

  for(let i = 0; i < Object.keys(Names).length; i++){
    if(req.body.Body.toLowerCase() == Object.keys(Names)[i]){
      console.log("we found a match for " + Object.keys(Names)[i]);
    }
  }


  res.end();


});

app.get('/*', (req, res)=>{

    res.render('404.html')

});
