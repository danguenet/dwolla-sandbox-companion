const dwolla = require("dwolla-v2");

const attachBankAccount = (req, res) => {
  const client = new dwolla.Client({
    key: req.body.key,
    secret: req.body.secret,
    environment: "sandbox",
  });

  const requestBody = {
    routingNumber: req.body.routingNumber,
    accountNumber: req.body.accountNumber,
    bankAccountType: req.body.bankAccountType,
    name: req.body.name,
  };

  client.auth.client().then(async (appToken) => {
    let buttonText = "Next";
    let buttonLink = "/send/get-master-account";
    let textClass = "text-success";
    let buttonClass = "btn-success";

    const response = await appToken
      .post(`${req.body.sendUser}/funding-sources`, requestBody)
      .then((res) => {
        return [res.status, res.headers.get("location")];
      })
      .catch((err) => {
        buttonText = "Back";
        buttonLink = "/send/attach-bank-account";
        textClass = "text-danger";
        buttonClass = "btn-outline-danger";
        return [err.status, JSON.stringify(err.body)];
      });
    res.render("code", {
      status: response[0],
      location: response[1],
      buttonText: buttonText,
      buttonLink: buttonLink,
      localStorage: "sendBank",
      textClass: textClass,
      buttonClass: buttonClass,
    });
  });
};

module.exports = attachBankAccount;
