const express = require("express"),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    logger = require("morgan"),
    es6Renderer = require("express-es6-template-engine"),
    session = require("express-session"),
    FileStore = require("session-file-store")(session);

require("dotenv").config();


const indexRouter = require("./routes/index"),
    usersRouter = require("./routes/users");

const app = express();

app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
}))

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
