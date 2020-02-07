const Predmet = require("../models/predmet"),
    Predavanje = require("../models/predavanje"),
    Student = require("../models/student"),
    httpStatus = require("http-status-codes");

module.exports = {

    showPredmet: (req, res, next) => {
        let predmetId = req.params.id;
        Predavanje.find({'predmet': predmetId})
            .then(predavanja => {
                res.render("profesor/predavanja", {predavanja: predavanja});
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                res.render("error");
            });
    },
    dodaj: function(req,res){
        var p = new Predmet({
            naziv: req.params.naziv,
            profesor: req.user._id
        });
        Predmet.create(p,
            function (error, savedDocument) {
                if (error) {
                    console.info(error);
                    res.sendStatus(400);
                } else {
                    console.log(`Kreiran predmet`);
                    res.sendStatus(200);
                }
            }
        );
    },
    dodajStudenta: function (req,res) {
        let indeks = req.body.indeks;
        let predId = req.params.id;
        Student.findOne({indeks: indeks})
            .then(stu =>{
                Predmet.findOneAndUpdate(
                    { _id: predId },
                    { $push: { studenti: stu._id  } },
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    });
            })
            .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            res.render("error");
        });
    }

};