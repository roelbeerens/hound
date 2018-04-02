const exec = require('child_process').exec;
const chalk = require("chalk");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = {
  profile: function (profile) {
    exec(`/usr/src/app/lib/equal/set ${profile}`, (error) => {
      if (error) {
        console.log(chalk.red(`exec error: ${error}`));
        return;
      } else {
        db.unset('audio')
          .write();

        db.defaults({audio: []})
          .write();

        db.set('audio', [{'profile': profile}])
          .write();

        return profile;
      }
    });
  },
  settings: function () {
    let object = db.get('audio')
      .first()
      .value();

    if (object) {
      return object.profile;
    }
  }
};