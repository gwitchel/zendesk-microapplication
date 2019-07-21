const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const request = require('request');

exports.getSwimlanes = async function (projectID) {
    var proj; 
    var projectIdList = []
    var options = {
        method: 'GET',
        url: 'https://gwitchel@gmail.com:lKxytQXek3QRnejxhXMA32C2@vrtestsite.atlassian.net/rest/api/3/project/' + projectID+ '/statuses'
   };
    await request(options, function (error, response, body) {
        if (error) throw new Error(error);
        proj = JSON.parse(body);
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000)
        resolve(proj) // successfully fill promise
    })
};