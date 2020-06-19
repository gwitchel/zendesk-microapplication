const requests = require('./requests.js')
var restify = require('restify');
const express = require('express')
const app = express()
var WebSocket = require('ws');


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
      var chats = await requests.getAllChats(req.params.token);
      res.send({"Chats: " : chats})
      return next();
  })();
});
server.get('/websocket/:token', function (req, res, next) {
  var ws_client = new WebSocket(
      'wss://rtm.zopim.com/stream', {
      headers: {
        'Authorization': 'Bearer ' + req.params.token
      }
    }
  );
  ws_client.on('open', function() {
    console.log('Successfully connected');
  });
  return next();
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

server.listen(process.env.PORT || 8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
