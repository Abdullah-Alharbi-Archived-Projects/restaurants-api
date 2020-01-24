const _ = require("lodash");
const uuid = require("uuid/v1");
const config = require("config");

module.exports = function(files, folder = "uploads") {
  try {
    _.forEach(_.keysIn(files), key => {
      const file = files[key];
      const extention = file.name.match(/\.\w+/)[0];
      file.mv(`./src/${config.get("static")}/${folder}/${uuid() + extention}`);
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
