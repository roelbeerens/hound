const path = require('path');
const chalk = require("chalk");
const express = require('express');
const app = express();
const supervisor = require(path.join(__dirname + '/supervisor'));
const feedback = require(path.join(__dirname + '/feedback'));

app.use(express.static('ui'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

module.exports = {
    run: function () {
        app.route('/').get(function (req, res) {
            res.sendFile(path.join(__dirname + '/ui/index.html'));
        }).post(function (req, res) {
            if (req.body.shutdown === '1') {
                supervisor.shutdown();
            } else if (req.body.reboot === '1') {
                supervisor.reboot();
            }

            res.redirect('back');
        });

        app.listen(80, function () {
            console.log(chalk.cyan('Started UI'));
            feedback.startup();
        });
    }
};