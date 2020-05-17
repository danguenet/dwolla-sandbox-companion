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

    const response = await appToken
      .post("customers", requestBody)
      .then((res) => {
        return [res.status, res.headers.get("location")];
      })
      .catch((err) => {
        buttonText = "Back";
        buttonLink = "/send/create-user";
        return [err.status, JSON.stringify(err.body._embedded.errors)];
      });
    res.render("code", {
      status: response[0],
      location: response[1],
      buttonText: buttonText,
      buttonLink: buttonLink,
      localStorage: "sendUser",
    });
  });
};

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

    const response = await appToken
      .post(`${req.body.sendUser}/funding-sources`, requestBody)
      .then((res) => {
        return [res.status, res.headers.get("location")];
      })
      .catch((err) => {
        buttonText = "Back";
        buttonLink = "/send/attach-bank-account";
        return [err.status, JSON.stringify(err.body)];
      });
    res.render("code", {
      status: response[0],
      location: response[1],
      buttonText: buttonText,
      buttonLink: buttonLink,
      localStorage: "sendBank",
    });
  });
};

const getMasterAccount = (req, res) => {
  const client = new dwolla.Client({
    key: req.body.key,
    secret: req.body.secret,
    environment: "sandbox",
  });

  client.auth.client().then(async (appToken) => {
    let buttonText = "Next";
    let buttonLink = "/send/get-master-funding-source";

    const response = await appToken
      .get("/")
      .then((res) => {
        return [res.status, res.body._links.account.href];
      })
      .catch((err) => {
        buttonText = "Back";
        buttonLink = "/send/get-master-account";
        return [err.status, JSON.stringify(err.body)];
      });
    res.render("code", {
      status: response[0],
      location: response[1],
      buttonText: buttonText,
      buttonLink: buttonLink,
      localStorage: "masterAccount",
    });
  });
};

const getMasterFundingSource = (req, res) => {
  const client = new dwolla.Client({
    key: req.body.key,
    secret: req.body.secret,
    environment: "sandbox",
  });

  client.auth.client().then(async (appToken) => {
    let buttonText = "Next";
    let buttonLink = "/send/move-money";
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
        return [err.status, JSON.stringify(err.body)];
      });
    res.render("code", {
      status: response[0],
      location: response[1],
      buttonText: buttonText,
      buttonLink: buttonLink,
      localStorage: "masterFundingSource",
    });
  });
};

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
    const response = await appToken
      .post("transfers", requestBody)
      .then((res) => {
        return [res.status, res.headers.get("location")];
      })
      .catch((err) => {
        buttonText = "Back";
        buttonLink = "/send/move-money";
        return [err.status, JSON.stringify(err.body)];
      });
    res.render("code", {
      status: response[0],
      location: response[1],
      buttonText: buttonText,
      buttonLink: buttonLink,
      localStorage: "sendBank",
    });
  });
};

module.exports = {
  attachBankAccount,
  createUser,
  getMasterAccount,
  getMasterFundingSource,
  moveMoney,
};
