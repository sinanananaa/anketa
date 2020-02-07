"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    Predavanje = require("./predavanje");

var pitanjeSchema = new Schema(

    {   tip: {
            type: Number,
            min: 1,
            max: 4 //1 tekstualni odgovor, 2 DA/NE, 3 multiple choice samo jedan, 4 multiple choice više,
        },
        tekst: {
            type: String,
            required: true
        },
        vrijemeTrajanja: {
            type: Number,
            default: 60 //vrijeme u sekundama
        },
        predavanje:{
            type: Schema.Types.ObjectId,
            ref: "Predavanje",
            required: true
        },
        ponudjeniOdgovori: [{
          type: String
        }],
        otvoreno: Boolean
    },
);

module.exports = mongoose.model("Pitanje", pitanjeSchema);