var ws = new WebSocket("ws://localhost:3000");

var userName = prompt("Please pick a wonderful username to chat with!");

var userColor = prompt("Please pick an awesome color!");

var body=document.querySelector("body");

var ul=document.createElement("ul");
body.appendChild(ul);

var input=document.querySelector("input");
var button=document.querySelector("button");


var addText = function(msg) {

  var newLi = document.createElement("li");

  var pars = JSON.parse(msg);
  var printParse = pars.name + " : " + pars.userMessage;

  newLi.style.color = pars.color;

  newLi.innerHTML=printParse;
  console.log(newLi);

  var firstLi = ul.firstChild;
  ul.insertBefore(newLi,firstLi);
  ul.scrollTop = ul.scrollHeight;
}

ws.addEventListener("open", function(evt) {
  console.log("connected");
});

ws.addEventListener("message", function(evt) {
  addText(evt.data)
  console.log(evt.data);

});

button.addEventListener("click", function(evt) {

  var user = {name: userName, userMessage: input.value, color: userColor};
  var userInfo = JSON.stringify(user);

  console.log(user.userMessage);

  ws.send(userInfo);
  input.value="";

});

input.addEventListener("keydown", function(evt) {

  if (evt.keyCode === 13 ){
    var text=input.value;

    var user = {name: userName, userMessage: input.value, color: userColor};
    var userInfo = JSON.stringify(user);

    ws.send(userInfo);
    input.value= "";

  }
});
