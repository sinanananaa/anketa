const Odgovor = require("../models/odgovor"),
    mongoose = require("mongoose"),
    httpStatus = require("http-status-codes");

module.exports = {
    dodaj: function (req,res,done) {
          let tip = req.body.tip;
          var odg;
          if(tip != 4 )
              odg = new Odgovor({
                  tip: req.body.tip,
                  tekst: req.body.tekst,
                  tacno: true,
                  pitanje: req.body.pitanjeId,
                  student: req.user._id
              });
          else odg = new Odgovor({
              tip: req.body.tip,
              izabrani: JSON.parse(req.body.izabrani),
              tacno: true,
              pitanje: req.body.pitanjeId,
              student: req.user._id
          });
          Odgovor.create(odg,
              function (error, savedDocument) {
                  if (error) {
                      console.log("Greška pri spremanju odgovora.");
                      res.sendStatus(400);
                  } else {
                      console.log(`Kreiran odgovor`);
                      res.sendStatus(200);
                  }
              }
          );
          },
    odgovoriStudenta: function (req,res) {
        Odgovor.find({student: req.user._id})
            .populate('pitanje')
            .sort({'timestamps': -1})
            .then( odgovori => {
                console.log("Ispisujem odgovore studenta.");
                console.log(odgovori.length);
                for(var i=0; i<odgovori.length; i++)
                    if(odgovori[i].tip == 4)
                        console.log(odgovori[i].pitanje.ponudjeniOdgovori);
                for(var i=0; i<odgovori.length; i++)
                    if(odgovori[i].tip == 4)
                        console.log(odgovori[i].izabrani);
                res.render("student/historijaOdgovora", {odgovori: odgovori});
            })
            .catch(function (error) {
                res.sendStatus(400);
            });
    }
};
