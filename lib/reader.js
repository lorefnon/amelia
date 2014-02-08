var colors = require('colors');
var FeedParser = require('feedparser');
var request = require('request');
var Promise = require('mpromise');
var Feed = require('./feed');

var Reader = function(db){
    this.db = db;
    this.collections = {
        feeds: db.get('feeds'),
        groups: db.get('groups')
    }
};

Reader.prototype = {

    add: function(name, url, cb){
        return this.collections.feeds
            .insert(new Feed(name, url));
    },

    purge: function(name, cb){
        return this.collections.feeds
            .remove({name: name})
    },

    list: function(cb){
        return this.collections.feeds
            .find();
    },

    read: function(name, cb){
        var promise = new Promise();
        this.collections.feeds
            .findOne({ name: name })
            .then(function(doc){

                var items = [];

                request(doc.url)
                    .pipe(new FeedParser())
                    .on('error', function(err){
                        promise.reject(err);
                    })
                    .on('data', function(item){
                        items.push(item);
                    })
                    .on('end', function(){
                        promise.fulfill(items);
                    });
            }, function(err){
                promise.reject(err);
            });
        return promise;
    }
}

module.exports = Reader;
