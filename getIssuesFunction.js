const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var request = require('request');

exports.getIssueInfo = async function (board) {
  var obj; 
  var issues = []
  var options = {
    method: 'GET',
   url: 'https://gwitchel@gmail.com:lKxytQXek3QRnejxhXMA32C2@vrtestsite.atlassian.net/rest/api/2/search?jql=project='+board ,
 };
 await request(options, function (error, response, body) {
    if (error) throw new Error(error);
    obj =  JSON.parse(body);
    //console.log(obj.fields.description.content[0].content[0].text);
 });
 
 await new Promise((resolve, reject) => setTimeout(resolve, 3000));
 return new Promise(function(resolve, reject) {
  setTimeout(resolve, 3000)
  for(var i = 0; i < obj.issues.length; i++){
    issues.push({
      'id' : obj.issues[i].id,
      'key': obj.issues[i].key,
      'description' : obj.issues[i].fields.description,
      'summary' : obj.issues[i].fields.summary,
      'creator' : obj.issues[i].fields.creator.displayName,
      'priority' : obj.issues[i].fields.priority.name,
      'issueType' :  obj.issues[i].fields.issuetype.name,
      'reporter' : obj.issues[i].fields.reporter.displayName,
      'swimlane' : {'id' : obj.issues[i].fields.status.id , 'name' :  obj.issues[i].fields.status.name} ,
    })
  }
  resolve(issues) // successfully fill promise
 })
 // return obj;
};

