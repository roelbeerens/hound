const mpv = require('node-mpv');
const player = new mpv({
    'audio_only': true,
    'verbose': true,
    'debug': true,
}, [
    '--volume=20',
    '--no-config',
    '--load-scripts=no',
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