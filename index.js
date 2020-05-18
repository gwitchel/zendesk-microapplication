const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const getIssues = require('./getIssuesFunction')
const getIssuesList = require('./getIssuesListFunction.js')
const getAddInfo = require('./getAdditionalInfoFunction.js')
const postFunctions = require('./postIssuesFunction.js') 
const http = require('http');
const url = require('url');
var restify = require('restify');
 
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.get('/projects', function (req, res, next) {
    (async () => {
        var projects = await getIssuesList.getProjectList();
        res.send({"projects" : projects})
        return next();
    })();
});
server.get('/metadata/:id', function (req, res, next) {
  (async () => {
      var projects = await getIssuesList.getIssueMetadata(req.params.id);
      res.send({"permissions" : projects})
      return next();
  })();
});
server.get('/tickets/:projectID', function (req, res, next) {
    (async () => {
        var swimObject = [];
        var swimLanes = await getAddInfo.getSwimlanes(req.params.projectID); swimLanes = swimLanes[0].statuses;
        var issues = await getIssues.getIssueInfo(req.params.projectID);
        var projData = await getIssuesList.getProjectByIDMini(req.params.projectID);
        for(var i = 0; i < swimLanes.length; i++){
          var name = swimLanes[i].name;  var id = swimLanes[i].id; 
          swimObject.push({  "name" : name, "id" : id })
        }
        res.send({"project" : [{
            'mpid': req.params.projectID,
            'name' : projData.description,
            'key' : projData.key,
            'Swimlanes' : swimObject,
            'Issues': issues
          }]})
        return next();
    })();
});
server.put('/setAssignee/:issueID/:name',
  function(req, res, next) {
    (async () => {
      console.log(req.params)
      // req.someData = 'foo';
      postFunctions.setAsigneeName(req.params.issueID,req.params.name);
       return next();
    })(); 
  },
  function(req, res, next) {
    res.send(req.params);
    return next();
  }
)
 
server.listen(process.env.PORT || 8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// Connection URL
const Mongourl = 'mongodb://localhost:27017/testDB';
 
// Database Name
const dbName = 'testDB';


