const fs = require("fs");
const { join } = require("path");

module.exports = file => {
  return new Promise((resolve, reject) => {
    const relativePath = join(__dirname, "../", "public", file.path);
    fs.unlink(relativePath, error => {
      if (error) return reject(error);

      resolve(true);
    });
  });
};
