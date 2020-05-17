const express = require("express");
const router = express.Router();

// Require Controllers
const sendController = require("./controllers").send;
const viewsController = require("./controllers").views;

// Views
router.get("/", viewsController.renderHome);
router.get("/congrats", viewsController.renderCongrats);
router.get(
  "/send/attach-bank-account",
  viewsController.renderSendAttachBankAccount
);
router.get("/send/create-user", viewsController.renderSendCreateUser);
router.get("/send/get-master-account", viewsController.renderGetMasterAccount);
router.get(
  "/send/get-master-funding-source",
  viewsController.renderGetMasterFundingSource
);
router.get("/send/move-money", viewsController.renderSendMoveMoney);

// Send
router.post("/customers/send/create-user", sendController.createUser);
router.post(
  "/funding-sources/send/attach-bank-account",
  sendController.attachBankAccount
);
router.post("/root/send/get-master-account", sendController.getMasterAccount);
router.post(
  "/funding-sources/send/get-master-funding-source",
  sendController.getMasterFundingSource
);
router.post("/transfers/send/move-money", sendController.moveMoney);

module.exports = router;
