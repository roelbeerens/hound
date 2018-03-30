const path = require('path');
const chalk = require("chalk");
const express = require('express');
const app = express();
const controls = require(path.join(__dirname + '/controls'));
const feedback = require(path.join(__dirname + '/feedback'));

module.exports = {
    run: function () {
        app.use(express.static('ui'));

        app.route('/').get(function (req, res) {
            res.sendFile(path.join(__dirname + '/ui/index.html'));
        }).post(function (req, res) {
            console.log(req);
            // if(req.body.shutdown === 1) {
            //     controls.shutdown();
            //     res.end("yes");
            // }
        });

        app.listen(80, function () {
            console.log(chalk.cyan('Started UI'));
            feedback.startup();
        });
    }
};