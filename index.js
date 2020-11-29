var express = require("express");
var cors = require("cors");
var app = express();
var port = 3700;

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.engine("jade", require("jade").__express);
app.get("/", function (req, res) {
  res.render("page");
});
app.use(express.static(__dirname + "/public"));
app.use(cors({ credentials: true, origin: true }));
var server = app.listen(port);
var io = require("socket.io")().listen(server);
io.sockets.on("connection", function (socket) {
  socket.emit("message", { message: "Welcome to the discussions page" });
  socket.on("send", function (data) {
    io.sockets.emit("message", data);
  });
});
console.log("Listening on port: " + port);
