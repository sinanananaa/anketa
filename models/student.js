"use strict";

const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var studentSchema = new Schema(
    {
        ime: {
                type: String,
                trim: true
        },
        prezime: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        indeks: {
            type: Number,
            required: true,
            unique: true
        },
        prof: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    {
        timestamps: true
    }
);

studentSchema.plugin(passportLocalMongoose, {
    usernameField: "username"
});

module.exports = mongoose.model("Student", studentSchema);