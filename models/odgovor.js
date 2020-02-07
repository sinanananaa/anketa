"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    Pitanje= require("./pitanje"),
    Student = require("./student");
var odgovorSchema = new Schema(
    {
        tip: {
            type: Number,
            min: 1,
            max: 4 //1 DA/NE, 2 multiple choice samo jedan, 3 multiple choice više, 4 tekstualni odgovor
        },
        tekst: {
            type: String
        },
        izabrani: [{
           type: Number
        }],
        tacno: Boolean,
        pitanje:{
            type: Schema.Types.ObjectId,
            ref: "Pitanje"
        },
        student:{
            type: Schema.Types.ObjectId,
            ref: "Student"
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Odgovor", odgovorSchema);