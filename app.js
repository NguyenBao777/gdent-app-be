const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/public", express.static(path.join(__dirname, "./public")));
// cros polycies
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	res.setHeader("Access-Control-Allow-Methods", "Content-Type", "Authorization");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});
// Routes middle
const route = require("./routes/web");
app.use("/", route);
const port = process.env.PORT;
app.listen(4000, () => console.log(`running on port ${port}`));
