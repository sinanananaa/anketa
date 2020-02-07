const Student = require("../models/student"),
    Predavanje = require("../models/predavanje"),
    httpStatus = require("http-status-codes"),
    passport = require("passport"),
    getStudentParams = body => {
        return {
            ime: body.first,
            prezime: body.prezime,
            email: body.email,
            username: body.username,
            indeks: body.indeks
        };
    };

module.exports = {
    show: (req, res, next) => {
        if(req.user){
            let studentId = req.user._id;
            Student.findById(studentId)
                .then(student => {
                    res.send(student.ime);
                    next();
                })
                .catch(error => {
                    console.log(`Error fetching user by ID: ${error.message}`);
                    next(error);
                });
        } else {
            res.render("error");
            next();
        }
    },
    showIndex: (req,res) => {
        res.render("student/index")
    },
    login: (req, res) => {
        if(req.user) res.redirect("/student");
        let student = "student";
        res.render("login", {user: student});
    },
    authenticate: passport.authenticate("studentLocal", {
        successRedirect: "/student/",
        failureRedirect: "/student/login"
    }),
    provjera: function(req,res,next){
        if(req.user && !req.user.prof){
            next();
        } else {
            res.redirect("/");
        }
    }
};