"use strict";

const router = require("express").Router(),
    homeController = require("../controllers/homeController"),
    studentController = require("../controllers/studentController"),
    odgovorController = require("../controllers/odgovorController"),
    anketaController = require("../controllers/anketaController"),
    pitanjeStudentaController = require("../controllers/pitanjeStudentaController");

router.get("/", homeController.index);
router.get("/logout", homeController.logout);
router.post("/odgovor/posalji", odgovorController.dodaj);


module.exports = router;
