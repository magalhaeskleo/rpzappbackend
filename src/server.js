const express = require("express");
const mongoose = require("mongoose");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("ok");
});

mongoose.connect(
  "mongodb+srv://rpzadmin:rpzadmin@cluster0-z7deq.mongodb.net/bdrpz?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

server.listen(3333);
