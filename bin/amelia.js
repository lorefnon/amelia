#!/usr/bin/env node

var path = require('path');
var Reader = require(path.join(__dirname, '../lib/reader' ));
var consoleReporter = require(path.join(__dirname, '../lib/console_reporter' ));

mongoConfig = {
    database: 'localhost/ReaderDB'
}

var controller = {

    aliases: {
        r: 'read', get: 'read', fetch: 'read',
        'new': 'add',
        del: 'purge', remove: 'purge', rm: 'purge',
        all: 'list'
    },

    actions: {
        add: function(reader){
            var name = process.argv[3];
            var url = process.argv[4];

            return reader.add(name, url);
        },
        purge: function(reader){
            var name = process.argv[3];
            return reader.purge(name);
        },
        list: function(reader){
            return reader.list();
        },
        read: function(reader){
            var name = process.argv[3];
            return reader.read(name);
        },
        help: function(){
            console.log('Amelia - ver. 0.0.1');
            console.log('\nUsage:\n');
            console.log('$ amelia read "<alias>"         read RSS feed');
            console.log('$ amelia add "<alias>" "<url>"  add RSS feed');
            console.log('$ amelia purge "<alias>"        remove RSS feed');
            console.log('$ amelia list                   list current feeds');
            process.exit();
        }
    },

    match: function() {
        var cmd = process.argv[2];
        if (cmd.slice(0, 2) === '--') {
            cmd = cmd.slice(2);
        }
        return this.actions[cmd] ? cmd : this.aliases[cmd];
    },

    run: function(db){
        var reader = new Reader(db);
        var action = this.match()
        if (action) {
            this.actions[action](reader)
                .then(function(res){
                    consoleReporter[action].success(res);
                    process.exit();
                }, function(err){
                    consoleReporter[action].error(err);
                    process.exit();
                })
                .end();
        } else {
            this.actions.help();
        }
    }
}

controller.run(require('monk')(mongoConfig.database));
