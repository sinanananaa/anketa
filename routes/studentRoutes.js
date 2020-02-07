"use strict";

const router = require("express").Router(),
    studentController = require("../controllers/studentController"),
    odgovorController = require("../controllers/odgovorController");


router.get("/login", studentController.login);
router.post("/login",studentController.authenticate);
router.get("/", studentController.provjera, studentController.showIndex);
router.get("/historijaodgovora", studentController.provjera, odgovorController.odgovoriStudenta);

module.exports = router;
