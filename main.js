"use strict";
const express = require("express"),
    layouts =  require("express-ejs-layouts"),
    app = express(),
    router = require("./routes/index"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator");

mongoose.Promise = global.Promise;

/*
mongodb+srv://dbUser:<password>@cluster0-3t0tm.mongodb.net/test?retryWrites=true&w=majority
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0-3t0tm.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});*/



mongoose.connect(
    process.env.MONGODB_URI || "mongodb+srv://dbUser:dbUserPassword@cluster0-3t0tm.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useFindAndModify: false }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


app.set("port", process.env.PORT || 5000);
app.set("view engine", "ejs");

app.use(morgan("combined"));
app.use(layouts);
app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);


app.use(express.json());

app.use(cookieParser("tajnaanketa123"));
app.use(
    expressSession({
        secret: "tajnaanketa123",
        cookie: {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});
app.use(expressValidator());
app.use("/", router);

const server = app.listen(app.get("port"), () => {
        console.log(`Server running at http://localhost:${app.get("port")}`);
    });
