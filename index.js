const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const getIssues = require('./getIssuesFunction')
const getIssuesList = require('./getIssuesListFunction.js')
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
        res.send(projects)
        return next();
    })();
});
server.get('/tickets/:projectID', function (req, res, next) {
    //res.send(req.params.projectID);
    //return next();
    (async () => {
        var issues = await getIssues.getIssueInfo(req.params.projectID);
        res.send(issues)
        return next();
    })();
});
 
server.listen(process.env.PORT || 8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// Connection URL
const Mongourl = 'mongodb://localhost:27017/testDB';
 
// Database Name
const dbName = 'testDB';

// (async () => {
// //console.log(await getIssues.getIssueInfo('VRSCRUM-2'));
// var projects = await getIssuesList.getProjectList();
// console.log(projects);
// var issues = await getIssues.getIssueInfo(projects[0].id);
// console.log(issues);
// //console.log(await getIssues.getIssueInfo('VRSCRUM-3'));
// })();

// MongoClient.connect(Mongourl,{ useNewUrlParser: true }, function(err, client) {
//    assert.equal(null, err);
//    console.log("Connected successfully to server");
//    const db = client.db(dbName);
//    var collection = db.collection('testDB');
//    //console.log(db.databaseName);
//    //var dbo = db.db("testDB");
//    (async () => {    
//     var projects = await getIssuesList.getProjectList();
//         var Data = {
//              projects: undefined, 
//              description: "oof" };
//         collection.insertOne(Data, function(err, res) {
//             if (err) throw err;
//             console.log("1 document inserted");
//         });
//     })();
//     //db.close();

//  });



