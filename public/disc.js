window.onload = function () {
  var messages = [];
  var users = [];
  var socket = io.connect("http://localhost:3700");
  var field = document.getElementById("field");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");
  var name = document.getElementById("name");
  socket.on("message", function (data) {
    if (data.message) {
      messages.push(data.message);
      users.push(data.username);
      var msgbody = "";
      for (var i = 0; i < messages.length; i++) {
        msgbody += "<b>" + (users[i] ? users[i] : "Anonymous") + ":</b>";
        msgbody += messages[i] + "<br/>";
      }
      content.innerHTML = msgbody;
      content.scrollTop = content.scrollHeight;
    } else {
      console.log("Oops! Looks like there is an issue:", data);
    }
  });

  sendButton.onclick = function () {
    var text = field.value;
    socket.emit("send", { message: text, username: name.value });
    field.value = "";
  };
};
