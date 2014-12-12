var ws = new WebSocket("ws://localhost:3000"); //for browser you don't need to install or require. It is ready to go.

var body = document.querySelector("body"); //selecting body

var ul = document.createElement("ul"); //creating ul
body.appendChild(ul); //attaching ul to browser

var input = document.querySelector("input"); //selecting the input from my userChat.js
var button = document.querySelector("button"); //creating a button

var addText = function(msg) { //msg is predefined
  var newLi = document.createElement("li"); //creating li
  newLi.innerHTML=msg; //saying li will have inner text

  var firstLi = ul.firstChild; //giving instructions to li
  ul.insertBefore(newLi, firstLi);
}

ws.addEventListener("open", function(evt) {
  addText("CONNECTED"); //attaching the function
  console.log("CONNECTED");//shows up in browser console.
});

ws.addEventListener("message", function(evt) {
  addText(evt.data); //.data property of an object. This is telling the program that data is coming in. Data = message. and print it
});

button.addEventListener("click", function(evt){ //this button will take user input and send it to the server (terminal)
  ws.send(input.value);
  input.value=" ";
});

//this allows you to type from the terminal to your browser!
