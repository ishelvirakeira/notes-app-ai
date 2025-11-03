const connectToMongo = require("./config/db");
connectToMongo();

const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//sessions and messages
app.use(
  session({
    secret: "noteAppSecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

//routes
app.use("/auth", require("./app/auth"));
app.use("/", require("./app/routes"));

//start server
const PORT = 4500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
