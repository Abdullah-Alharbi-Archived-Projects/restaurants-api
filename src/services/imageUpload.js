const _ = require("lodash");
const uuid = require("uuid/v1");

module.exports = function(files, path = "/uploads") {
  return new Promise((resolve, reject) => {
    _.forEach(_.keysIn(files), key => {
      const file = files[key];
      file.mv(`${path}/${uuid()}.${file.mimetype}`);
      // TODO: save in images
    });
  });
};
