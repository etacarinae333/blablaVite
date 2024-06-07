import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3000;

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});

app.use("/assets", express.static(__dirname + "/dist/assets"));
app.use("/img", express.static(__dirname + "/dist/img"));
app.use("/scss", express.static(__dirname + "/dist/scss"));

app.get("/contacts", function (_, res) {
  res.sendFile("dist/contacts.html", { root: __dirname });
});
app.get("/about-us", function (_, res) {
  res.sendFile("dist/about-us.html", { root: __dirname });
});
app.get("/404", function (_, res) {
  res.sendFile("dist/404.html", { root: __dirname });
});

app.get("/", function (_, res) {
  res.sendFile("dist/index.html", { root: __dirname });
});
