"use strict"
const cookieParser = require("cookie-parser")
const express = require("express")
const Poll = require("../models/Poll")
const TimeCollection = require("../models/TimeCollection")
const router = express.Router()
router.use("/api", require("./api"))
router.get("/", cookieParser(), function (req, res) {
    if (req.cookies.username && req.cookies.username.trim().length !== 0) {
        Poll.getByUser(req.cookies.username).then(function (times) {
            res.render("index", {
                username: req.cookies.username.trim(),
                selection: times,
                timeCollection: TimeCollection
            })
        }).catch(function (err) {
            res.status(500).send(err.message)
        })
    } else {
        res.render("index", {
            timeCollection: TimeCollection
        })
    }
})
router.get("/result", function (req, res) {
    Poll.getAll().then(function (groups) {
        let ordered = TimeCollection.map(function (time) {
            let g = groups.find(function (group) {
                return group.time === time
            });
            if (g) {
                return g
            } else {
                return {
                    time: time,
                    count: 0
                }
            }
        })
        res.render("result", {
            groups: ordered
        })
    }).catch(function (err) {
        res.status(500).send(err.message)
    })
})
module.exports = router