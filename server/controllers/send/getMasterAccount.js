const dwolla = require("dwolla-v2");

const getMasterAccount = (req, res) => {
  const client = new dwolla.Client({
    key: req.body.key,
    secret: req.body.secret,
    environment: "sandbox",
  });

  client.auth.client().then(async (appToken) => {
    let buttonText = "Next";
    let buttonLink = "/send/get-master-funding-source";
    let textClass = "text-success";
    let buttonClass = "btn-success";

    const response = await appToken
      .get("/")
      .then((res) => {
        return [res.status, res.body._links.account.href];
      })
      .catch((err) => {
        buttonText = "Back";
        buttonLink = "/send/get-master-account";
        textClass = "text-danger";
        buttonClass = "btn-outline-danger";
        return [err.status, JSON.stringify(err.body)];
      });
    res.render("code", {
      status: response[0],
      location: response[1],
      buttonText: buttonText,
      buttonLink: buttonLink,
      localStorage: "masterAccount",
      textClass: textClass,
      buttonClass: buttonClass,
    });
  });
};

module.exports = getMasterAccount;
