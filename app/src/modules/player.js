const mpv = require('node-mpv');
const player = new mpv({
    'audio_only': true,
    'verbose': false,
    'debug': false,
}, [
    '--volume=20'
]);

module.exports = {
    play: function (url) {
        this.stop();
        player.load(url);
    },
    stop: function () {
        player.stop();
    },
    mute: function () {
        player.toggleMute();
    },
    volume: function (level) {
        player.volume(level);
    },
    status: function () {
        return player.observed;
    }
};