var Websocket = require("ws").Server;
var server = new Websocket({port:3000});
var clients = [];
var history = [];

server.on("connection", function(ws) {

  if (history.length>0) {
    history.forEach(function(x) {
      ws.send(x);
    })
  }

  clients.push(ws);

  clients.forEach(function(client)
  {
    var serverMessage = {name: "user", userMessage: "connected!"}
    var j_serverMessage = JSON.stringify(serverMessage);
    client.send(j_serverMessage);
  })

  console.log(clients.length + " clients are in the room");

  ws.on("message",function(message) {
    history.push(message);

    clients.forEach(function(client) {

      if (client !== ws ) {
        client.send(message);
      }
    })

    console.log(message);

    var pars = JSON.parse(message);
    var printParse = pars.userMessage;

    //console.log(printParse);

    //var bannedWords = ["like", "super", "totally", "jelly"];

     //bannedWords.forEach(function(x) {
       //if ( printParse === bannedWords){
         //var serverMessage = {name: "server", userMessage: "Sorry, that word is not allowed"}
         //var j_serverMessage = JSON.stringify(serverMessage);
          //ws.send(j_serverMessage);
          //console.log("they used a bad word");
          //ws.close();
       //}
     //})

    if ( printParse === "like" || printParse === "super") {
      var serverMessage = {name: "server", userMessage: "Sorry, that word is not allowed"}
      var j_serverMessage = JSON.stringify(serverMessage);
      ws.send(j_serverMessage);
      console.log("they used a bad word");
      ws.close();
    }

  })

  ws.on("close",function() {
   var x = clients.indexOf(ws);
    clients.splice(x,1);

    console.log(clients.length+" clients are  still in the room");
    clients.forEach(function(client) {
      client.send("Oh no someone left!");
    })
  })
})
