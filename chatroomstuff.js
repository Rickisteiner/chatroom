var WSS = require("ws").Server;
var server = new WSS ({port:3000});

var clients = [];

ws.on("open", function() {
  clients.push(ws); //pushing to the clients array
  //console.log(clients);

  ws.on("close", function(){ //we need to set a close because otherwise the program freaks out. Why because it will keep looping
    //through the array but a client xed out of the array and the prgram doesn't get that so it will just crash.
    var x = clients.indexOf(ws); //we need to set the index so the prgram understands we took a client out of a certain place.
    clients.splice(x,1); //this is set to a loop. So it will keep looping through.
  })

  clients.forEach(function(client) { //every time a client connects it will send this.
    client.send("Sean has lot's of hair");

  });

});
