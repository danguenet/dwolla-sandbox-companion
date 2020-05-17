const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./server/routes");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use("/", routes);

app.listen(port, () =>
  console.log(`Dwolla App listening at http://localhost:${port}`)
);
