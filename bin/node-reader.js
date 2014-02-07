#!/usr/bin/env node
/*
*** node-reader --- command-line RSS reader
*** Developer: Oleksii Kulikov
*** Email: yeexel@gmail.com
*/
var argv = require('optimist').argv;
var path = require('path');
var Reader = require(path.join(__dirname, '../lib/reader' ));

var Db = require('mongodb').Db,
Server = require('mongodb').Server;

var mongoConfig = {
    database: 'ReaderDB',
    host: 'localhost',
    port: 27017
};

var db = new Db(mongoConfig.database, new Server(
    mongoConfig.host,
    mongoConfig.port
), { w: 1});

var controller = {

    actions: {
        add: function(reader, cb){
            var name = process.argv[3];
            var url = process.argv[4];

            reader.add(name, url, cb);
        },
        purge: function(reader, cb){
            var name = process.argv[3];
            reader.purge(name, cb);
        },
        list: function(reader, cb){
            reader.list(cb);
        },
        read: function(reader, cb){
            var name = process.argv[3];
            reader.read(name, cb);
        }
    },

    run: function(db, cb){
        var reader = new Reader(db);
        for (action in this.actions) {
            if (argv[action]) {
                this.actions[action](reader, cb)
                return;
            }
        }
        reader.help();
    }
}

db.open(function(err, db){
    if (! err) {
        controller.run(db, function(){
            db.close();
        });
    } else {
        console.dir(err);
    }
});
