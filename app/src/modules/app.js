const path = require('path');
const chalk = require("chalk");
const express = require('express');
const app = express();
const supervisor = require(path.join(__dirname + '/supervisor'));
const player = require(path.join(__dirname + '/player'));
// const radio = require(path.join(__dirname + '/radio'));

app.use(express.static('src'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const TuneIn = require('node-tunein-radio');
const radio = new TuneIn({
    protocol: 'https',          // Protocol to use, either 'http' or 'https', default https
    cacheRequests: false,       // Wheter or not to cache requests, default false
    cacheTTL: 1000 * 60 * 5,    // TTL for cached results, default 5 mins
});

module.exports = {
    init: function () {
        app.route('/').get(function (req, res) {
            res.sendFile(path.join(__dirname + '/../views/index.html'));
        }).post(function (req, res) {

            if (req.body.reboot === '1') {
                supervisor.reboot();
            }

            res.redirect('back');
        });

        app.route('/player/volume').post(function (req, res) {
            if (req.body.volume) {
                player.volume(req.body.volume);
            }
            res.end();
        });

        app.route('/player/mute').get(function (req, res) {
            player.mute();
            res.send({'message': 'OK'});
        });

        app.route('/player/stop').get(function (req, res) {
            player.stop();
            res.send({'message': 'OK'});
        });

        app.route('/player/status').get(function (req, res) {
            res.send(player.status());
        });

        app.route('/radio').get(function (req, res) {
            res.sendFile(path.join(__dirname + '/../views/radio/index.html'));
        });

        app.route('/radio/play/:guide_id').get(function (req, res) {
            radio.tune_radio(req.params.guide_id).then(function (result) {
                player.play(result.body[0].url);
                res.send({'message': result.body[0]});
            }).catch(function (err) {
                console.log(err);
            });
        });

        app.route('/radio/stations').get(function (req, res) {
            radio.browse_local().then(function (result) {
                res.send(result.body[0].children);
            }).catch(function (err) {
                console.log(err);
            });
        });

        app.route('/radio/stations/search').post(function (req, res) {
            let query = req.body.query;

            radio.search(query).then(function (result) {
                res.send(result.body);
            }).catch(function (err) {
                console.log(err);
            });
        });

        app.listen(80, function () {
            console.log(chalk.cyan('Started UI'));
        });
    }
};