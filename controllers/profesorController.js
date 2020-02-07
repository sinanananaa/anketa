const Profesor = require("../models/profesor"),
    Predmet = require("../models/predmet"),
    Predavanje = require("../models/predavanje")
    passport = require("passport"),
    getProfesorParams = body => {
        return {
            name: {
                first: body.first,
                last: body.last
            },
            email: body.email,
            password: body.password,
        };
    };

module.exports = {
    show: (req, res, next) => {
        if(req.user) {
            let profesorId = req.user._id;
            Predmet.find({'profesor': profesorId})
                .then(predmeti => {
                    res.render("profesor/predmeti", {predmeti: predmeti});
                })
                .catch(error => {
                    console.log(`Error fetching user by ID: ${error.message}`);
                    res.render("error");
                });
        } else {
            res.render("error");
            next();
        }
    },
    login: (req, res) => {
        if(req.user) res.redirect("/profesor");
        let profesor = "profesor";
        res.render("login", {user: profesor});
    },
    authenticate: passport.authenticate("profesorLocal", {
        failureRedirect: "/profesor/login",
        successRedirect: "/profesor"
    }),
    provjera: function(req,res,next){
        if(req.user && req.user.prof){
            next();
        } else {
            res.redirect("/");
        }
    }
};