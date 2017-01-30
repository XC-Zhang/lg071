"use strict";
const Poll = require("../models/Poll");
const TimeCollection = require("../models/TimeCollection");
const uid = require("uid");

Poll.deleteAll().then(function () {
    return new Array(50).fill(null).reduce(function (previous) {
        return previous.then(function () {
            let user = uid();
            let index = Math.trunc(Math.random() * TimeCollection.length);
            let time = TimeCollection[index];
            return Poll.upsertByUser(user, [time]);
        });
    }, Promise.resolve());
}).catch(function (err) {
    console.log(err);
});
