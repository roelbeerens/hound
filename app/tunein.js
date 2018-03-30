const TuneIn = require('node-tunein-radio');
const tunein = new TuneIn({
    protocol: 'https',          // Protocol to use, either 'http' or 'https', default https
    cacheRequests: false,            // Wheter or not to cache requests, default false
    cacheTTL: 1000 * 60 * 5,    // TTL for cached results, default 5 mins
});
let mpv = require('node-mpv');
let mpvPlayer = new mpv();

tunein.browse_local().then(function (result) {
    let stations = result.body[0].children;
    let radio = stations[3];
    tunein.tune_radio(radio.guide_id).then(function (result) {
        let stream = result.body[0];
        mpvPlayer.load(stream.url);
        mpvPlayer.volume(50);
    });
}).catch(function (err) {
    console.log(err);
});

mpvPlayer.on('statuschange', function(status){
    console.log(status);
});