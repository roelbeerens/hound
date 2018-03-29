const path = require('path');
const chalk = require("chalk");
const express = require('express');
const app = express();

module.exports = {
    run: function () {
        app.use(express.static('ui'));

        app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname + '/ui/index.html'));
        });

        app.listen(80, function () {
            console.log(chalk.cyan('Started UI'));
        });
    }
};