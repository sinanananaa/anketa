"use strict";

const Predavanje = require("../models/predavanje"),
    Odgovor = require("../models/odgovor"),
    Chart = require('chart.js'),
    httpStatus = require("http-status-codes");

module.exports = {
    provjeraAnkete: function (req,res,next) {
        let sifra = req.params.sifra;
        console.log("ista");
        Predavanje.findOne({sifra: sifra})
            .then( predavanje => {
                if(predavanje){
                    if(predavanje.aktivna){
                        console.log("Anketa je aktivna.");
                        next();
                    } else {
                        console.log("Anketa nije aktivna.");
                        res.render("error");
                    }
                } else {
                    console.log("Anketa s tom šifrom ne postoji.");
                    res.render("error");
                }
            })
            .catch(error => {
                console.log("Greška pri traženju predavanja.");
                res.render("error");
            });
    },
    showAnketa: function (req,res) {
        let sifra = req.params.sifra;
        var predavanje, pitanje, odgovori; var odgovoriS = [];
        Predavanje.findOne({sifra: sifra})
            .then(pred =>{
                predavanje = pred;
                return Predavanje.populate(pred,"trenutnoPitanje");
            })
            .then(pred =>{
                pitanje = pred.trenutnoPitanje;
                return Odgovor.find({pitanje: pitanje._id});
            })
            .then( odgovori1 => {
                odgovori = odgovori1;
                return Odgovor.findOne({pitanje: pitanje._id, student: req.user._id});
            })
            .then(odg => {
                if(!req.user.prof && !odg){
                    console.log("Prikazujem pitanje.");
                    res.render("trenutnoPitanje", {trenutnopitanje: pitanje, prikazpitanje: true, rezultati: false});
                } else {
                    console.log("Prikazujem rezultate.");
                    var o = [];
                    if(pitanje.tip!=4) {
                        for (var i = 0; i < odgovori.length; i++)
                            o.push(odgovori[i].tekst);
                    } else {
                        for(var i=0; i<odgovori.length; i++) {
                            odgovoriS.push(odgovori[i].izabrani);
                            for(var j=0; j<odgovori[i].izabrani.length; j++) {
                                o.push(odgovori[i].izabrani[j]);
                            }
                        }
                    }
                    console.log(o);
                    if(!req.user.prof){
                        console.log("za studenta");
                        if(pitanje.tip != 4)
                            res.render("trenutnoPitanje", {trenutnopitanje: pitanje, prikazpitanje: false, rezultati: true, anonimna: predavanje.anonimna, odgovori: o});
                        else res.render("trenutnoPitanje", {trenutnopitanje: pitanje, prikazpitanje: false, rezultati: true, anonimna: predavanje.anonimna, odgovori: JSON.stringify(o)});
                    }
                    else {
                        console.log("za prof");
                        if(predavanje.anonimna) {
                            console.log("anonima");
                            res.render("trenutnoPitanje", {
                                trenutnopitanje: pitanje,
                                prikazpitanje: true, rezultati: true, anonimna: predavanje.anonimna,
                                odgovori: JSON.stringify(o)
                            });
                        } else {
                            var student=[];
                            Odgovor.populate(odgovori, 'student').then(odg => {
                                for(var i=0; i<odg.length; i++){
                                    student.push(odgovori[i].student.ime+" "+odgovori[i].student.prezime);
                                }

                                if(pitanje.tip == 4) {
                                    res.render("trenutnoPitanje", {
                                        trenutnopitanje: pitanje,
                                        prikazpitanje: true, rezultati: true, anonimna: predavanje.anonimna,
                                        studenti: student,
                                        odgovori: JSON.stringify(o),
                                        odgovoriP: odgovoriS
                                    });
                                } else {
                                    res.render("trenutnoPitanje", {
                                        trenutnopitanje: pitanje,
                                        prikazpitanje: true, rezultati: true, anonimna: predavanje.anonimna,
                                        studenti: student,
                                        odgovori: o,
                                        odgovoriP: o
                                    });
                                }
                            })
                        }
                    }
                }
            })
            .catch(function (error) {
                res.sendStatus(400);
            });
    }


};