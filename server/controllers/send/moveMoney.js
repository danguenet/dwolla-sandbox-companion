const dwolla = require("dwolla-v2");

const moveMoney = (req, res) => {
  const client = new dwolla.Client({
    key: req.body.key,
    secret: req.body.secret,
    environment: "sandbox",
  });

  const requestBody = {
    _links: {
      source: {
        href: req.body.source,
      },
      destination: {
        href: req.body.destination,
      },
    },
    amount: {
      currency: req.body.currency,
      value: req.body.value,
    },
  };

  client.auth.client().then(async (appToken) => {
    let buttonText = "Next";
    let buttonLink = "/congrats";
    let textClass = "text-success";
    let buttonClass = "btn-success";

    const response = await appToken
      .post("transfers", requestBody)
      .then((res) => {
        return [res.status, res.headers.get("location")];
      })
      .catch((err) => {
        buttonText = "Back";
        buttonLink = "/send/move-money";
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

module.exports = moveMoney;
