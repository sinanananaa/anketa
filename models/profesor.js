"use strict";

const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var profesorSchema = new Schema(
    {
        ime: {
            type: String,
            trim: true
        },
        prezime: {
            type: String,
            trim: true
        },
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        prof: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);


profesorSchema.plugin(passportLocalMongoose, {
    usernameField: "username"
});

module.exports = mongoose.model("Profesor", profesorSchema);
