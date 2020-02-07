"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    Predavanje = require("./predavanje"),
    Profesor = require("./profesor"),
    Student = require("./student");

var predmetSchema = new Schema(
    {
        naziv: {
            type: String,
            required: true,
            unique: true
        },
        profesor: {
            type: Schema.Types.ObjectID,
            ref: "Profesor",
            required: true,
            unique: true
        },
        studenti: [{
            type: Schema.Types.ObjectID,
            ref: "Student"
        }]
    },
);

module.exports = mongoose.model("Predmet", predmetSchema);