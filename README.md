"# microzen-server" 
 
 --> run application by typing "node index.js" in the command line 

--> http://localhost:8080/authenticate to get authentication token 
--> after authenticating zendesk will redirect you to http://localhost:8080/success with the access token 
located after the #, you can url encode this to request chat transcripts (http://localhost:8080/allChats/'<your token>')
