const requests = require('./requests.js')
var restify = require('restify');
const express = require('express')
const app = express()
var WebSocket = require('ws');
var ws_client;
var createWebsocket = function(token) {
  ws_client = new WebSocket(
    'wss://rtm.zopim.com/stream', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  )
  ws_client.on('open', function() {
  const messageSubscriptionQuery = {
    topic: "chats.incoming_chats	",
    action: "subscribe"
  };
  ws_client.send(JSON.stringify(messageSubscriptionQuery));
  console.log('Successfully connected');
  });
  ws_client.on('message', function(event) {
    console.log('Received message from server: ' + event);
    var message = JSON.parse(event);
    if (message.status_code !== 200) {
      console.log('Invalid status code ' + message.status_code);
      return;
    }
  })
} 
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
 
server.use(restify.plugins.queryParser());
server.use(restify.plugins.authorizationParser());

// example request to localhost to retreiv chat transcripts
server.get('/allChats/:token', function (req, res, next) {
  (async () => {
    req.contentType = 'application/x-www-form-urlencoded'
    console.log(req.params.token)
      var chats = await requests.getAllChats(req.params.token);
      res.send({"Chats: " : chats})
      return next();
  })();
});

server.get('/openWebsocket/:token', function (req, res, next) {
  (async () => {
    req.contentType = 'application/x-www-form-urlencoded'
    console.log(req.params.token)
    createWebsocket(req.params.token );
    res.send({"token set to: " : req.params.token})
    return next();
  })();
});



server.get('/', function (req, res, next) {
  (async () => {
      res.send("hello world")
      return next();
  })();
});
//original call to go to zendesk authentication this is no longer used as it was replaced in public.js
 server.get('/authenticate', function (req, res, next) {
  (async () => {
    req.contentType = 'application/x-www-form-urlencoded'
      var info = await requests.getAuthToken();
      res.send({"params: " : info})
      return next();
  })();
});
server.get('/success', function (req, res, next) {
  (async () => {
      res.send("success")
      return next();
  })();
});

app.listen(8080, function () {
  console.log("Server is running on "+ port +" port");
});
