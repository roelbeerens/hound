const TuneIn = require('node-tunein-radio');
const radio = new TuneIn({
  protocol: 'https',          // Protocol to use, either 'http' or 'https', default https
  cacheRequests: false,       // Wheter or not to cache requests, default false
  cacheTTL: 1000 * 60 * 5,    // TTL for cached results, default 5 mins
});

module.exports = {
  stations: function () {
    radio.browse_local().then(function (result) {
      return result.body[0].children;
    }).catch(function (err) {
      console.log(err);
    });
  },
  station: function (id) {
    radio.tune_radio(id).then(function (result) {
      return result.body[0];
    }).catch(function (err) {
      console.log(err);
    });
  },
  stream: function (id) {
    radio.tune_radio(id).then(function (result) {
      return result.body[0].url;
    }).catch(function (err) {
      console.log(err);
    });
  }
};