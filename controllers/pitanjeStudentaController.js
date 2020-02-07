"use strict";

const pitanjeStudenta = require("../models/pitanjeStudenta"),
    Predavanje = require("../models/predavanje"),
    httpStatus = require("http-status-codes");

module.exports = {
    show: function (req,res) {
        var sifra = req.params.sifra;
        Predavanje.findOne({sifra: sifra})
            .then( p => {
                return pitanjeStudenta.find({predavanje: p, odgovoreno: false})
                    .sort({'odobravanja': -1});
            })
            .then( pitanja =>{
                res.render("pitanjaStudenata",{pitanja: pitanja});
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    dodaj: function (req,res) {
        var sifra = req.params.sifra;
        Predavanje.findOne({sifra: sifra})
            .then( predavanje => {
                var pS = new pitanjeStudenta({
                   tekst: req.body.tekst,
                   odobravanja: 0,
                   odgovoreno: false,
                   predavanje: predavanje._id
                });
                pitanjeStudenta.create(pS,
                    function (error, savedDocument) {
                        if (error) {
                            console.log("Greška pri spremanju pitanja.");
                            res.sendStatus(400);
                        } else {
                            console.log(`Kreirano pitanje`);
                            res.sendStatus(200);
                        }
                    }
                );
            })
            .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },
    odobri: function (req,res) {
        let pitanjeid = req.params.pitanje;
        pitanjeStudenta.findById(pitanjeid)
            .then(pitanje =>{
                if(pitanje.studenti.indexOf(req.user._id)===-1){
                    pitanjeStudenta.findOneAndUpdate({_id: pitanjeid},{$inc : {'odobravanja' : 1}},function(err, result) {
                        if (err) {
                            res.send(err);
                        } else {
                            pitanjeStudenta.findOneAndUpdate({_id: pitanjeid},{$push: {'studenti': req.user._id} },function(err, result) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.sendStatus(200);
                                }
                            });
                        }
                });
                } else {
                    res.sendStatus(200);
                }
            })

    },
    ukloni: function (req,res) {
        let pitanjeid = req.params.pitanje;
        pitanjeStudenta.findOneAndUpdate({_id: pitanjeid},{'odgovoreno': true},function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.sendStatus(200);
            }
        });
    }
};