const dwolla = require("dwolla-v2");

const getMasterFundingSource = (req, res) => {
  const client = new dwolla.Client({
    key: req.body.key,
    secret: req.body.secret,
    environment: "sandbox",
  });

  client.auth.client().then(async (appToken) => {
    let buttonText = "Next";
    let buttonLink = "/send/move-money";
    let textClass = "text-success";
    let buttonClass = "btn-success";

    const response = await appToken
      .get(`${req.body.masterAccount}/funding-sources?removed=false`)
      .then((res) => {
        return [
          res.status,
          res.body._embedded["funding-sources"][0]._links.self.href,
        ];
      })
      .catch((err) => {
        buttonText = "Back";
        buttonLink = "/send/get-master-funding-source";
        textClass = "text-danger";
        buttonClass = "btn-outline-danger";
        return [err.status, JSON.stringify(err.body)];
      });
    res.render("code", {
      status: response[0],
      location: response[1],
      buttonText: buttonText,
      buttonLink: buttonLink,
      localStorage: "masterFundingSource",
      textClass: textClass,
      buttonClass: buttonClass,
    });
  });
};

module.exports = getMasterFundingSource;
