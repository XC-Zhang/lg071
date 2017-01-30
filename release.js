const fs = require("fs-promise");
const path = require("path");
const dirs = [
    "models",
    "public",
    "routes",
    "views",
    "config.json",
    "index.js",
    "package.json"
]
fs.remove(path.join(__dirname, "release")).then(function () {
    return fs.ensureDir(path.join(__dirname, "release"));
}).then(function () {
    return dirs.reduce(function (previous, dir) {
        return previous.then(function () {
            console.log(`Copying ${dir}...`);
            return fs.copy(path.join(__dirname, dir), path.join(__dirname, "release", dir));
        });
    }, Promise.resolve());
}).then(function () {
    console.log("Done.");
}, function (reason) {
    console.log(reason);
});