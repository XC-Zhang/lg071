"use strict";
const config = require("../config.json");
const MongoClient = require("mongodb").MongoClient;
class Poll {
    static getAll() {
        return MongoClient.connect(config.mongodb).then(function (db) {
            return db.collection("result").group({
                time: true
            }, {}, {
                count: 0
            }, function (obj, prev) { 
                prev.count++; 
            }, true).then(function (groups) {
                db.close();
                return groups;
            });
        });
    }
    static getByUser(username) {
        if (!username || typeof username !== "string" || username.trim().length === 0) {
            return Promise.reject(new RangeError());
        }
        return MongoClient.connect(config.mongodb).then(function (db) {
            return db.collection("result").find({
                name: username
            }).project({
                time: 1
            }).toArray().then(function (documents) {
                db.close();
                return documents.map(function (document) {
                    return document.time;
                });
            });
        });
    }
    static upsertByUser(username, times) {
        if (!username || typeof username !== "string" || username.trim().length === 0) {
            return Promise.reject(new RangeError());
        }
        return MongoClient.connect(config.mongodb).then(function (db) {
            return db.collection("log").insertOne({
                name: username,
                selection: times,
                time: new Date()
            }).then(function () {
                return db.collection("result").deleteMany({
                    name: username
                });
            }).then(function () {
                return db.collection("result").insertMany(times.map(function (time) {
                    return {
                        name: username,
                        time
                    }
                }));
            }).then(function (result) {
                db.close();
                return result;
            });
        });
    }
    static deleteAll() {
        return MongoClient.connect(config.mongodb).then(function (db) {
            return db.collection("result").deleteMany({}).then(function (result) {
                db.close();
                return result;
            });
        });
    }
}
module.exports = Poll;