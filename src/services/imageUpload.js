const _ = require("lodash");
const uuid = require("uuid/v1");
const config = require("config");

module.exports = function(files, folder = "uploads") {
  try {
    files = _.flatten(files);
    const paths = [];
    _.forEach(_.keysIn(files), key => {
      const file = files[key];
      const extention = file.name.match(/\.\w+/)[0];
      const name = uuid() + extention;
      file.mv(`./src/${config.get("static")}/${folder}/${name}`);

      paths.push({
        path: `/${folder}/${name}`,
        name
      });
    });

    return [true, paths];
  } catch (error) {
    console.log(error);
    return false;
  }
};
