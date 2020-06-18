const requests = require('./requests.js')
var restify = require('restify');
const express = require('express')
const app = express()


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

//original call to go to zendesk authentication this is no longer used as it was replaced in public.js
/* server.get('/authenticate', function (req, res, next) {
  (async () => {
    req.contentType = 'application/x-www-form-urlencoded'
      var info = await requests.getAuthToken();
      res.send({"params: " : info})
      return next();
  })();
});
*/ 

server.listen(process.env.PORT || 8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
