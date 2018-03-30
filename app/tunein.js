const TuneIn = require('node-tunein-radio');
const tunein = new TuneIn({
    protocol        : 'https',          // Protocol to use, either 'http' or 'https', default https
    cacheRequests   : false,            // Wheter or not to cache requests, default false
    cacheTTL        : 1000 * 60 * 5,    // TTL for cached results, default 5 mins
});

tunein.browse_local().then(function(result) {
    let stations = result.body;
    console.log(stations);
    // stations.forEach(function(element) {
    //     console.log(element);
    // });
}).catch(function(err) {
    console.log(err);
});