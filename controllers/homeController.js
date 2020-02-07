"use strict";
const Pitanje = require("../models/pitanje");

module.exports = {
    index: (req, res) => {
        res.render("index");
    },
    logout: (req, res, next) => {
        req.logout();
        res.redirect("/");
    }
};
