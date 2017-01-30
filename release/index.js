"use strict"
const config = require("./config.json");
const express = require("express")
const path = require("path")
const app = express()
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))
app.use(require("./routes"))
const server = app.listen(process.env.PORT || config.port || 80, function () {
    console.log("Port: " + server.address().port)
})