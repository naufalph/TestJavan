const express = require("express");
const { errorHandler } = require("./errorHandlers");
const cors = require("cors");
const router = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(router);

app.use(errorHandler)

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
