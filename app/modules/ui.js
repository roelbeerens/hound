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
            } else if (req.body.radio === '1') {
                playRadio();
            } else if (req.body.stop_radio === '1') {
                stopRadio();
            }

            res.redirect('back');
        });

        app.listen(80, function () {
            console.log(chalk.cyan('Started UI'));
            feedback.startup();
        });
    }
};

const TuneIn = require('node-tunein-radio');
const tunein = new TuneIn({
    protocol: 'https',          // Protocol to use, either 'http' or 'https', default https
    cacheRequests: false,            // Wheter or not to cache requests, default false
    cacheTTL: 1000 * 60 * 5,    // TTL for cached results, default 5 mins
});

const mpv = require('mpv-controller');
const player = new mpv();

function playRadio() {
    tunein.browse_local().then(function (result) {
        let stations = result.body[0].children;
        let radio = stations[3];
        tunein.tune_radio(radio.guide_id).then(function (result) {
            let stream = result.body[0];
            player.play(stream.url, ['--no-video', '--no-audio-display', '--volume=50']);
        });
    }).catch(function (err) {
        console.log(err);
    });
}

function stopRadio() {
    player.kill();
}