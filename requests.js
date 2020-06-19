var request = require('request');
// example request to get auth token using id and subdomain current auth endpoint is used in publick.js
exports.getAuthToken = async function () {
    var proj; 
    var options = {
        method: 'GET',
        url: 'https://www.zopim.com/oauth2/authorizations/new?response_type=token&client_id=daP4zkn7uAgzu4Spj9dUbE5dPB1YTopvDvrhtW9LiAyiN7i8Mz&scope=read%20write%20chat&subdomain=georgiasnuff'
   };
    await request(options, function (error,req, response, body) {
        if (error) throw new Error(error);
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000)
        resolve(proj) // successfully fill promise
    })
};

// actual enpoint to get all chat data for server 
exports.getAllChats = async function (token) {
    var chats;
    console.log(token)
    var options = {
        method: 'GET',
        Headers: {
            'Content-Type': "application/x-www-form-urlencoded",
        },
        rejectUnauthorized: false,
        url: 'https://www.zopim.com/api/v2/chats?access_token=' + token //url encoded token 
   };
    await request(options, function (error, response, body) {
        console.log(options)
        if (error) throw new Error(error);
        chats = JSON.parse(body);
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000)
        resolve(chats) // successfully fill promise
    })
};


