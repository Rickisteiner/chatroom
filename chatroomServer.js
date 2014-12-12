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
    client.send("connected!");
  })

  console.log(clients.length + " clients are in the room");

  ws.on("message",function(message) {
    history.push(message);
    ws.send(message);
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
