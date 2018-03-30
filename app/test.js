// import the module
const ShairportReader = require('shairport-sync-reader');
const pipeReader = new ShairportReader({ path: '/tmp/shairport-sync-metadata' });

pipeReader.on('pbeg', function(data){
    console.log(chalk.blue(data));
});

pipeReader.on('pend', function(data){
    console.log(chalk.blue(data));
});