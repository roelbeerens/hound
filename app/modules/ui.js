const path = require('path');
const chalk = require("chalk");
const express = require('express');
const app = express();
const supervisor = require(path.join(__dirname + '/supervisor'));
const feedback = require(path.join(__dirname + '/feedback'));
const player = require(path.join(__dirname + '/player'));
const TuneIn = require('node-tunein-radio');
const tunein = new TuneIn({
    protocol: 'https',          // Protocol to use, either 'http' or 'https', default https
    cacheRequests: false,       // Wheter or not to cache requests, default false
    cacheTTL: 1000 * 60 * 5,    // TTL for cached results, default 5 mins
});

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
            if (req.body.reboot === '1') {
                supervisor.reboot();
            }

            res.redirect('back');
        });

        app.route('/volume/').post(function (req) {
            if (req.body.volume) {

            }
        });

        app.get('/tunein/', function (req, res) {
            res.sendFile(path.join(__dirname + '/ui/tunein/index.html'));
        });

        app.get('/tunein/stop', function (req, res) {
            player.stop();
            res.send({'message': 'Stopped'});
        });

        app.get('/tunein/play/:guide_id', function (req, res) {
            tunein.tune_radio(req.params.guide_id).then(function (result) {
                player.play(result.body[0].url);
            }).catch(function (err) {
                console.log(err);
            });
        });

        app.get('/tunein/stations/', function (req, res) {
            tunein.browse_local().then(function (result) {
                res.send(result.body[0].children);
            }).catch(function (err) {
                console.log(err);
            });
        });

        app.get('/tunein/stations/:id/', function (req, res) {
            tunein.tune_radio(id).then(function (result) {
                res.send(result.body[0]);
            }).catch(function (err) {
                console.log(err);
            });
        });

        app.listen(80, function () {
            console.log(chalk.cyan('Started UI'));
            feedback.startup();
        });
    }
};