const path = require('path');
const chalk = require("chalk");
const express = require('express');
const app = express();
const controls = require(path.join(__dirname + '/controls'));
const feedback = require(path.join(__dirname + '/feedback'));

app.use(express.static('ui'));
app.use(express.json());
app.use(express.urlencoded());

module.exports = {
    run: function () {
        app.route('/').get(function (req, res) {
            res.sendFile(path.join(__dirname + '/ui/index.html'));
        }).post(function (req, res) {
            if (req.body.shutdown === '1') {
                controls.shutdown();
            } else if (req.body.reboot === '1') {
                controls.reboot();
            }

            res.redirect('back');
        });

        app.listen(80, function () {
            console.log(chalk.cyan('Started UI'));
            feedback.startup();
        });
    }
};