const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    Student = require("../models/student"),
    Profesor = require("../models/profesor");

module.exports = function(passport){
        passport.use('profesorLocal', new LocalStrategy({usernameField: 'username'}, Profesor.authenticate()));
        passport.use('studentLocal', new LocalStrategy({usernameField: 'username'}, Student.authenticate()));
        passport.serializeUser(function (userObject, done){
            console.log("nesto");
            if (userObject.prototype instanceof Student) {
                Student.serializeUser();
                done(null, userObject);
            } else {
                Profesor.serializeUser();
                done(null, userObject);
            }
        });
        passport.deserializeUser(function(userObject, done){
            if (userObject.prototype instanceof Student) {
                Student.deserializeUser();
                done(null, userObject);
            } else {
                Profesor.deserializeUser();
                done(null, userObject);
            }
        });
};