const http = require("http");
const express = require("express");
const cors = require("cors");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
var fs = require("fs");
var morgan = require("morgan");
var path = require("path");

// loading process variables declared in .env file
require("dotenv").config();

const app = express();
const httpServer = http.createServer(app);

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// importing routes
const authRoutes = require("./src/api/auth/authRouter");
const thoughtRoutes = require("./src/api/thoughts/thoughtsRouter");
const replyRoutes = require("./src/api/replies/repliesRouter");
const userRoutes = require("./src/api/users/usersRouter");
const swaggerDocument = YAML.load("./apis.yaml");

// Using Routes
app.use("/api/auth", authRoutes);
app.use("/api/thought", thoughtRoutes);
app.use("/api/reply", replyRoutes);
app.use("/api/user", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//default route
app.use("/", (req, res, next) => {
  res.send("Ready to Serve!!!");
});

//if something wrong with the server
app.use((req, res, next) => {
  res.status(500).json({
    message: "Something went wrong",
  });
});

const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("MongoDB connected!!!");
  httpServer.listen(port, () => {
    console.log("serving!!!");
  });
});
