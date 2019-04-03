const path = require("path");
const express = require("express");
// const route = require("./route/index");
const { static_root, port, } = require("./config");

const app = express();
app.use(logger);
app.use(
  express.static(static_root, {
    dotfiles: "deny",
    extensions: ["html", "htm", "png", "jgp", "jpeg", "ttf",],
    maxAge: "30 days",
  })
);
// route(app);
// app.use("/*", (req, res) => {
//   res.sendFile(path.resolve(static_root, "index.html"));
// });
app.use("/upload", (req, res) => {
  console.log(req);
  res.send('hello world');
});
app.use("/*", (req, res) => {
  res.send('hello world');
});
app.listen(port);
console.log('listening '+ port);

function logger(req, res, next) {
  console.log("time: %s,url: %s".blue, Date(), req.url);
  next();
}
