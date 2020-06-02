const renderHome = (req, res) => {
  res.render("home");
};

const renderSendAttachBankAccount = (req, res) => {
  res.render("send/attach-bank-account");
};

const renderSendCreateUser = (req, res) => {
  res.render("send/create-user");
};

const renderGetMasterAccount = (req, res) => {
  res.render("send/get-master-account");
};

const renderGetMasterFundingSource = (req, res) => {
  res.render("send/get-master-funding-source");
};

const renderSendMoveMoney = (req, res) => {
  res.render("send/move-money");
};

const renderCongrats = (req, res) => {
  res.render("congrats");
};

module.exports = {
  renderHome,
  renderSendAttachBankAccount,
  renderSendCreateUser,
  renderGetMasterAccount,
  renderGetMasterFundingSource,
  renderSendMoveMoney,
  renderCongrats,
};
