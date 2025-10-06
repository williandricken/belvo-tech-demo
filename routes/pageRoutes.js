const express = require("express");
const router = express.Router();
const ofdaController = require('../controllers/ofdaController');

router.get('/listAllInstitutions', ofdaController.listAllInstitutions);
router.post('/pix/create', ofdaController.biometricPix);
router.post('/widget/create', ofdaController.createWidget);
router.post('/link/create', ofdaController.createLink);

router.get("/", (req, res) => {
    res.render("index")
});

router.get("/pix", (req, res) => {
    res.render("pix")
});

router.get("/widget", (req, res) => {
    res.render("widget")
});

router.get("/linkCreation", (req, res) => {
    res.render("linkCreation")
});

router.get("/accountList", (req, res) => {
    res.render("accountList")
});

// router.get("/listAllInstitutions", (req, res) => {
//     res.render("listAllInstitutions")
// });

module.exports = router;