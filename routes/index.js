"use strict";

const router = require("express").Router(),
    studentRoutes = require("./studentRoutes"),
    profesorRoutes = require("./profesorRoutes"),
    anketaRoutes = require("./anketaRoutes"),
    errorRoutes = require("./errorRoutes"),
    homeRoutes = require("./homeRoutes");

router.use("/student", studentRoutes);
router.use("/profesor", profesorRoutes);
router.use("/anketa", anketaRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;