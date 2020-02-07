"use strict";

const router = require("express").Router(),
    anketaController = require("../controllers/anketaController"),
    pitanjeStudentaController = require("../controllers/pitanjeStudentaController");


router.get("/:sifra/pitanjastudenata", pitanjeStudentaController.show);
router.post("/:sifra/pitanjastudenata/dodaj", pitanjeStudentaController.dodaj);
router.post("/:sifra/pitanjastudenata/:pitanje/odobri", pitanjeStudentaController.odobri);
router.post("/:sifra/pitanjastudenata/:pitanje/ukloni", pitanjeStudentaController.ukloni);
router.get("/:sifra", anketaController.provjeraAnkete, anketaController.showAnketa);

module.exports = router;