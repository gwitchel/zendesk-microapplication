const assert = require('assert');
const  request = require('request');

exports.getProjectList = async function (issueID, propertyKey) {
    var bodyData = `{}`;
    var options = {
        method: 'PUT',
        url: 'https://gwitchel@gmail.com:lKxytQXek3QRnejxhXMA32C2@vrtestsite.atlassian.net/rest/api/3/issue/' + issueID + '/properties/' + propertyKey,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: bodyData
    };
    
    request(options, function (error, response, body) {
       if (error) throw new Error(error);
       console.log(
          'Response: ' + response.statusCode + ' ' + response.statusMessage
       );
       console.log(body);
    });
}