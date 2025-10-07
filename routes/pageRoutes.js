const express = require("express");
const router = express.Router();
const ofdaController = require('../controllers/ofdaController');

const helpers = require('../helpers/linkInfoHelper');

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

router.get("/linkInfo", async (req, res) => {
    const ownersInfo = await helpers.getAllOwners(req.cookies.linkId);
    const accountsInfo = await helpers.getAllAccounts(req.cookies.linkId);
    const transactionsInfo = await helpers.getAllTransactions(req.cookies.linkId);
    const balancesInfo = await helpers.getAllBalances(req.cookies.linkId);
    const billsInfo = await helpers.getAllBills(req.cookies.linkId);
    const investmentsInfo = await helpers.getAllInvestments(req.cookies.linkId);
    const investmentsTransactionsInfo = await helpers.getAllInvestmentsTransactions(req.cookies.linkId);
    res.render("linkInfo", {ownersInfo: ownersInfo, accountsInfo: accountsInfo, transactionsInfo: transactionsInfo, balancesInfo: balancesInfo, billsInfo: billsInfo, investmentsInfo: investmentsInfo, investmentsTransactionsInfo: investmentsTransactionsInfo});
});

router.post("/owner/deleteOwner/:id", async (req, res) => {
    const ownerId = req.params.id;
    await helpers.deleteResource("owners", ownerId);
    res.redirect("/linkInfo");
});

router.post("/account/deleteAccount/:id", async (req, res) => {
    const accountId = req.params.id;
    await helpers.deleteResource("accounts", accountId);
    res.redirect("/linkInfo");
});

router.post("/transaction/deleteTransaction/:id", async (req, res) => {
    const transactionId = req.params.id;
    await helpers.deleteResource("transactions", transactionId);
    res.redirect("/linkInfo");
});

router.post("/bill/deleteBill/:id", async (req, res) => {
    const billId = req.params.id;
    await helpers.deleteResource("bills", billId);
    res.redirect("/linkInfo");
});

router.post("/investment/deleteInvestment/:id", async (req, res) => {
    const investmentId = req.params.id;
    await helpers.deleteResource("br/investments", investmentId);
    res.redirect("/linkInfo");
});

router.post("/investmentTransaction/deleteInvestment/:id", async (req, res) => {
    const investmentsTransactions = req.params.id;
    await helpers.deleteResource("br/investments-transactions", investmentsTransactions);
    res.redirect("/linkInfo");
});



module.exports = router;