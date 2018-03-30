// import the module
var ShairportReader = require('shairport-sync-reader');
var pipeReader = new ShairportReader({ address: '127.0.0.1', port: '5555' });

pipeReader.on('pbeg', function(data){
    console.log(chalk.blue(data));
});

pipeReader.on('pend', function(data){
    console.log(chalk.blue(data));
});