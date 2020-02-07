"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    Predmet = require("./predmet"),
    Pitanje = require("./pitanje");

var predavanjeSchema = new Schema(
    {
        naziv: {
            type: String,
            required: true,
            unique: true
        },
        redniBroj: {
            type: Number,
            required: true
        },
        sifra: {
            type: String,
            required: true,
            unique: true
        },
        predmet: {
            type: Schema.Types.ObjectID,
            ref: "Predmet"
        },
        aktivna: {
            type: Boolean,
            default: false
        },
        anonimna: {
            type: Boolean,
            default: false
        },
        trenutnoPitanje: {
            type: Schema.Types.ObjectID,
            ref: "Pitanje"
        },
        vrijemeStart: {
            type: Date
        }
    },
);

module.exports = mongoose.model("Predavanje", predavanjeSchema);