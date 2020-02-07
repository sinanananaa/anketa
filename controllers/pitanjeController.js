const Pitanje = require("../models/pitanje"),
    mongoose = require("mongoose"),
    httpStatus = require("http-status-codes");

module.exports = {

    dodaj: function(req,res) {
        var p;
        if(req.body.tip == 1 || req.body.tip == 2) {
            p = new Pitanje({
                tip: req.body.tip,
                tekst: req.body.tekst,
                vrijemeTrajanja: req.body.vrijeme,
                predavanje: req.params.id,
            });
        } else {
            p = new Pitanje({
                tip: req.body.tip,
                tekst: req.body.tekst,
                vrijemeTrajanja: req.body.vrijeme,
                predavanje: req.params.id,
                ponudjeniOdgovori: JSON.parse(req.body.ponudjeniOdg)
            });
        }
        Pitanje.create(p,
            function (error, savedDocument) {
                if (error) {
                    console.info(error);
                    res.sendStatus(400);
                } else {
                    console.log(`Kreirano pitanje`);
                    res.sendStatus(200);
                }
            }
        );
    },
    izbrisi: function(req,res){
        let pitanjeId = req.params.id;
        Pitanje.findByIdAndDelete(pitanjeId)
            .then(function() {
                console.log("Obrisano.");
                res.sendStatus(200);
            })
            .catch(function (error) {
                res.sendStatus(400);

            });
    },
    uredi: function(req,res){
        let pitanjeId = req.params.id;
        res.sendStatus(200);
    }

};