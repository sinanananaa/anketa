const Predavanje = require("../models/predavanje"),
    Predmet = require("../models/predmet"),
    Pitanje = require("../models/pitanje"),
    mongoose = require("mongoose"),
    Email = require("email").Email,
    httpStatus = require("http-status-codes"),
    getCourseParams = body => {
        return {
            naziv: body.naziv,

        };
    };

module.exports = {

    showPredavanje: (req, res, next) => {
        let predavanjeId = req.params.id;
        Pitanje.find({'predavanje': predavanjeId})
            .then(pitanja => {
                res.render("profesor/pitanja", {pitanja: pitanja});
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                res.render("error");
            });
    },
    dodaj: function(req,res){
        var p = new Predavanje({
            naziv: req.body.naziv,
            redniBroj: req.body.rb,
            sifra: req.body.sifra,
            predmet: req.params.id,
            aktivna: false,
            anonimna: req.body.anonimna,
            vrijemeStart: req.body.vrijeme
        });
        Predavanje.create(p,
            function (error, savedDocument) {
                if (error) {
                    console.info(error);
                    res.sendStatus(400);
                } else {
                    console.log(`Kreirano predavanje`);
                    res.sendStatus(200);
                }
            }
        );
    },
    izbrisi: function(req,res){
        let predavanjeId = req.params.id;
        Predavanje.findByIdAndDelete(predavanjeId)
            .then(function() {
                console.log("Obrisano.");
                res.sendStatus(200);
            })
            .catch(function (error) {
                res.sendStatus(400);

            });
    },
    postaviTrenutno: function (req,res) {
        let predavanjeId = req.params.idpred;
        let pitanjeId = req.params.idpit;
        Predavanje.findOneAndUpdate({_id: predavanjeId},{trenutnoPitanje: pitanjeId},function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.sendStatus(200);
            }
        });
    },
    aktiviraj: function (req,res,done) {
        let predavanjeId = req.body.predId;
        let predmetId = req.params.id;
        let sifra = req.body.sifra;
        let mailovi = [];
        console.log("nesto");
        console.log(predavanjeId);

        /*Predmet.findById(predmetId)
            .populate('studenti')
            .then(predmet =>{
                for(var i=0; i<predmet.studenti.length; i++)
                    mailovi.push(predmet.studenti[i].email);
                var myMsg = new Email(
                    { from: req.user.email,
                        to:   mailovi,
                        subject: "Anketa za predavanje",
                        body: "Link: localhost:5000/anekta/"+sifra
                    });
                myMsg.send(function(err){if (err) {
                    res.sendStatus(400);
                }});
            })
            .then(()=>{*/
                Predavanje.findOneAndUpdate({_id: predavanjeId},{aktivna: true},function(err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log("aktivna");
                        res.sendStatus(200);
                    }
                });
            /*})
            .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            res.render("error");
        });*/


    }

};