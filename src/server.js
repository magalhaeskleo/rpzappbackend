const express = require("express");
var cors = require("cors");
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
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes"));

server.listen(process.env.PORT || 3333);
