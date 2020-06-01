const dwolla = require("dwolla-v2");

const createUser = (req, res) => {
  const client = new dwolla.Client({
    key: req.body.key,
    secret: req.body.secret,
    environment: "sandbox",
  });

  const requestBody = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    type: req.body.type,
  };

  client.auth.client().then(async (appToken) => {
    let buttonText = "Next";
    let buttonLink = "/send/attach-bank-account";
    let textClass = "text-success";
    let buttonClass = "btn-primary";

    const response = await appToken
      .post("customers", requestBody)
      .then((res) => {
        return [res.status, res.headers.get("location")];
      })
      .catch((err) => {
        buttonText = "Back";
        buttonLink = "/send/create-user";
        textClass = "text-danger";
        buttonClass = "btn-outline-danger";
        return [err.status, JSON.stringify(err.body._embedded.errors)];
      });
    res.render("code", {
      status: response[0],
      location: response[1],
      buttonText: buttonText,
      buttonLink: buttonLink,
      localStorage: "sendUser",
      textClass: textClass,
      buttonClass: buttonClass,
    });
  });
};

module.exports = createUser;
