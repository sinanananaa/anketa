"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    Student = require("./student"),
    Predavanje = require("./predavanje");

var pitanjeStudentaSchema = new Schema(
    {
        tekst: {
            type: String,
            required: true
        },
        odobravanja: {
            type: Number,
            default: 0
        },
        odgovoreno: {
            type: Boolean,
            default: false
        },
        predavanje: {
            type: Schema.Types.ObjectID,
            ref: "Predavanje"
        },
        studenti: [{
            type: Schema.Types.ObjectID,
            ref: "Student"
        }]
    },
);

module.exports = mongoose.model("pitanjeStudenta", pitanjeStudentaSchema);