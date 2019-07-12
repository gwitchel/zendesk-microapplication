const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var request = require('request');

exports.getProjectList = async function () {
    var proj; 
    var projectIdList = []
    var options = {
        method: 'GET',
        url: 'https://gwitchel@gmail.com:lKxytQXek3QRnejxhXMA32C2@vrtestsite.atlassian.net/rest/api/2/project'
   };
    await request(options, function (error, response, body) {
        if (error) throw new Error(error);
        proj = JSON.parse(body);
        for(var i = 1; i < proj.length; i++){
            projectIdList.push({
                "id": proj[i].id,
                "key": proj[i].key,
                "name": proj[i].name,
            })
        }
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000)
        resolve(projectIdList) // successfully fill promise
    })
};

  
exports.getIssueInfo = async function (id,callback) {
    var obj; 
    var options = {
      method: 'GET',
     url: 'https://gwitchel@gmail.com:lKxytQXek3QRnejxhXMA32C2@vrtestsite.atlassian.net/rest/api/3/issue/'+id,
   };
   
   await request(options, function (error, response, body) {
      if (error) throw new Error(error);
      obj =  JSON.parse(body);
      //console.log(obj.fields.description.content[0].content[0].text);
  
   });
   await new Promise((resolve, reject) => setTimeout(resolve, 3000));
   return new Promise(function(resolve, reject) {
    setTimeout(resolve, 3000)
    resolve(obj.fields.description.content[0].content[0].text) // successfully fill promise
   })
   // return obj;
};


getIssueIds = async function(projectId, sprintId){
    var projects = await getProjectList(); 
    issueId = []; 
    //creates projects expand: a list of ids of every issue from every project. 
    for(var i = 0; i < projects.length; i++){
        var projectIdList = []
        var options = {
            method: 'GET',
            ///rest/api/2/search?jql=project=ABC&maxResults=1000
            url: 'https://gwitchel@gmail.com:lKxytQXek3QRnejxhXMA32C2@vrtestsite.atlassian.net/rest/api/2/search?jql=project='+projects[i]+'&maxResults=300'
        };
        await request(options, function (error, response, body) {
            if (error) throw new Error(error);
            proj = JSON.parse(body);
            for(var i = 0; i < proj.issues.length;i++){
                issueId.push(proj.issues[i].id); 
            }
        });
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000)
        resolve(issueId) // successfully fill promise
    })

}
 
exports.getIssues = async function(){
    var issueIds = await getIssueIds();
    var issues=[];  
    for(var i = 0; i < issueIds.length;i++){
        var options = {
            method: 'GET',
            ///rest/api/2/search?jql=project=ABC&maxResults=1000
            url: 'https://gwitchel@gmail.com:lKxytQXek3QRnejxhXMA32C2@vrtestsite.atlassian.net/rest/api/3/issue/'+issueIds[i]
        };
        await request(options, function (error, response, body) {
            if (error) throw new Error(error);
            issue = JSON.parse(body);
            issues.push(issue); 
        });
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000)
        resolve(issues) // successfully fill promise
    })
}

 