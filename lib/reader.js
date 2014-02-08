var colors = require('colors');
var FeedParser = require('feedparser');
var request = require('request');

var Db = require('mongodb').Db,
Server = require('mongodb').Server;

var db = new Db('ReaderDB', new Server('localhost', 27017), {
    w: 1
});
var collection = db.collection('feeds', {
    w: 1
});

var Feed = require('./feed');

var Reader = function(db){
    this.db = db;
    this.collections = {
        feeds: db.collection('feeds', {w: 1}),
        groups: db.collection('groups', {w: 1})
    }
};

Reader.prototype = {

    add: function(name, url, cb){
        var feed = new Feed(name, url);
        this.collections.feeds.insert(feed, function(err){
            cb(err, feed);
        });
    },

    purge: function(name, cb){
        this.collections.feeds.remove({name: name}, function(err){
            cb(err, name);
        });
    },

    list: function(cb){
        this.collections.feeds.find().toArray(function (err, items) {
            cb(err, items);
            return;
        })
    },

    read: function(name, cb){
        this.collections.feeds.findOne({name: name}, function(err, doc){
            if (! err) {
                request(doc.url).pipe(new FeedParser())
                    .on('error', function (error) {
                        db.close();
                    })
                    .on('data', function (item) {
                        cb(err, item);
                    });
            } else {
                cb(err);
            }
        });
    },

    help: function(){
        console.log('node-reader (nr) / ver. 0.0.4');
        console.log('Usage:');
        console.log('$ nr --read "<alias>" // read RSS feed');
        console.log('$ nr --add "<alias>" "<url>" // add RSS feed');
        console.log('$ nr --purge "<alias>" // remove RSS feed');
        console.log('$ nr --list // list current feeds');
        console.log('$ nr --help // Nothing to explain :)');
        console.log('Have fun!'.rainbow);
    }
}

module.exports = Reader;
