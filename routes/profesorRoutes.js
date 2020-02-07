"use strict";

const router = require("express").Router(),
    profesorController = require("../controllers/profesorController"),
    predmetController = require("../controllers/predmetController"),
    predavanjaController = require("../controllers/predavanjaController"),
    pitanjeController = require("../controllers/pitanjeController");

router.get("/login", profesorController.login);
router.post("/login",profesorController.authenticate);
router.post("/predmet/dodaj/:naziv", profesorController.provjera, predmetController.dodaj);
router.put("/predmet/:id/aktiviraj", profesorController.provjera, predavanjaController.aktiviraj);
router.post("/predmet/:id/dodaj", profesorController.provjera, predavanjaController.dodaj);
router.post("/predmet/:id/dodajStudenta", profesorController.provjera, predmetController.dodajStudenta);
router.get("/predmet/:id", profesorController.provjera, predmetController.showPredmet);
router.put("/predavanje/:idpred/pitanje/:idpit/trenutno", profesorController.provjera, predavanjaController.postaviTrenutno);
router.post("/predavanje/:id/dodaj", profesorController.provjera, pitanjeController.dodaj);
router.get("/predavanje/:id", profesorController.provjera, predavanjaController.showPredavanje);
router.delete("/pitanje/:id/izbrisi", profesorController.provjera, pitanjeController.izbrisi);
router.get("/", profesorController.provjera, profesorController.show);



module.exports = router;