"use strict"
const bodyParser = require("body-parser")
const express = require("express")
const MongoClient = require("mongodb").MongoClient
const Poll = require("../../models/Poll")
const router = express.Router()
router.get("/poll", function (req, res) {
    if (req.query.username && req.query.username.trim().length !== 0) {
        Poll.getByUser(req.query.username).then(function (document) {
            res.send(document)
        }, function (err) {
            res.status(500).send(err.message)
        })
    } else {
        Poll.getAll().then(function (groups) {
            res.send(groups)
        }, function (err) {
            res.status(500).send(err.message)
        })
    }
})
router.post("/poll", bodyParser.json(), function (req, res) {
    if (!req.body.name || typeof req.body.name !== "string" || req.body.name.trim().length === 0 || !Array.isArray(req.body.selection)) {
        res.sendStatus(400)
        return
    }
    Poll.upsertByUser(req.body.name, req.body.selection).then(function (result) {
        res.cookie("username", req.body.name)
        res.status(201).location(`./api/poll?username=${encodeURIComponent(req.body.name)}`).send(req.body)
    }).catch(function (err) {
        if (err) {
            res.status(500).send(err.message)
            return
        }        
    })
})
module.exports = router