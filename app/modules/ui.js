const path = require('path');
const chalk = require("chalk");
const express = require('express');
const app = express();
const controls = require(path.join(__dirname + '/modules/controls'));
const feedback = require(path.join(__dirname + '/modules/feedback'));

module.exports = {
    run: function () {
        app.use(express.static('ui'));

        app.route('/').get(function (req, res) {
            res.sendFile(path.join(__dirname + '/ui/index.html'));
        }).post(function (req, res) {
            if(req.body.shutdown === 1) {
                controls.shutdown();
                res.end("yes");
            }
        });

        app.listen(80, function () {
            console.log(chalk.cyan('Started UI'));
            feedback.startup();
        });
    }
};