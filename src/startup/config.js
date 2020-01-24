const { static } = require("express");
const { join } = require("path");
const config = require("config");
const serverDebugger = require("debug")("app:server");

module.exports = function(app) {
  if (config.has("static") && config.get("static")) {
    const path = join(__dirname, "..", config.get("static"));
    app.use(static(path));
    serverDebugger(`Serve static files is active "${config.get("static")}".`);
  }

  // note: if you are developing api disable that
  if (config.has("etag") && !config.get("etag")) {
    app.disable("etag");
    serverDebugger("Etag is disabled.");
  }

  if (config.has("powered-by") && config.get("powered-by")) {
    app.disable("x-powered-by");
    serverDebugger("-powered-by is disabled.");
  }
};
