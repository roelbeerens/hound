const TuneIn = require('node-tunein-radio');
const tunein = new TuneIn({
    protocol: 'https',          // Protocol to use, either 'http' or 'https', default https
    cacheRequests: false,            // Wheter or not to cache requests, default false
    cacheTTL: 1000 * 60 * 5,    // TTL for cached results, default 5 mins
});
const spawn = require('child_process').spawn;

tunein.browse_local().then(function (result) {
    let stations = result.body[0].children;
    let radio = stations[3];
    tunein.tune_radio(radio.guide_id).then(function (result) {
        let stream = result.body[0];
        play(stream.url);
    });
}).catch(function (err) {
    console.log(err);
});

function play(url) {
    spawn('mplayer', [url], {
        stdio: [0, 1, 2]
    });
}