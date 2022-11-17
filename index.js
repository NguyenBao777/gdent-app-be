const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "./public")));
app.get("/", (req, res) => {
	return res.status(200).send({ message: "server gdent-app" });
});
// Routes middle
const route = require("./routes/web");

app.use("/", route);
app.listen(4000, () => console.log(`running on port 4000`));
