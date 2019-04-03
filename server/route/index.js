const path = require("path");
// const { static_root, } = require("../config");

export default function (app) {
  // app.use("/*", (req, res) => {
  //   res.sendFile(path.resolve(static_root, "index.html"));
  // });
  app.use("/*", (req, res) => {
    res.send('hello world');
  });
}
