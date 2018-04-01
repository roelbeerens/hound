const TuneIn = require('node-tunein-radio');
const tunein = new TuneIn({
    protocol: 'https',          // Protocol to use, either 'http' or 'https', default https
    cacheRequests: false,       // Wheter or not to cache requests, default false
    cacheTTL: 1000 * 60 * 5,    // TTL for cached results, default 5 mins
});

module.exports = {
    get_stations: function () {
        tunein.browse_local().then(function (result) {
            return result.body[0].children;
        }).catch(function (err) {
            console.log(err);
        });
    },
    get_station: function (id) {
        tunein.tune_radio(id).then(function (result) {
            return result.body[0];
        }).catch(function (err) {
            console.log(err);
        });
    },
    get_stream: function (station) {
        return station.url;
    }
};