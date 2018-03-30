// import the module
const ShairportReader = require('shairport-sync-reader');
const pipeReader = new ShairportReader({ path: '/tmp/shairport-sync-metadata' });
const chalk = require("chalk");

pipeReader.on('pbeg', function(data){
    console.log(chalk.blue(data));
});

pipeReader.on('pend', function(data){
    console.log(chalk.blue(data));
});

pipeReader.on('meta', function(data){
    console.log(chalk.blue(data));
});