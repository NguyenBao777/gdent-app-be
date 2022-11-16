const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "./public")));
// Routes middle
const route = require("./routes/web");
app.use("/", route);
const port = process.env.PORT;
app.listen(4000, () => console.log(`running on port ${port}`));
