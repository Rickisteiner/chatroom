var Websocket = require("ws").Server;
var server = new Websocket({port:8080});
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

    var arr = printParse.split(" ");

    console.log(message);

    if(arr.indexOf("like") > -1 || arr.indexOf("super") > -1 || arr.indexOf("totally") > -1 || arr.indexOf("jelly") > -1) {
      var serverMessage = {name: "server", userMessage: "Sorry, that word is not allowed"}
      var j_serverMessage = JSON.stringify(serverMessage);
      ws.send(j_serverMessage);
      console.log("they used a bad word");
      ws.close();
    }

    ("(╯°□°）╯︵ ┻━┻")

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
