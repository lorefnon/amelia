var colors = require('colors');
var fancyTimeStamp = require('fancy-timestamp');

module.exports = {
    add: function(err, feed, cb){
        if (! err) {
            console.log(feed.name.green + " added to the database.");
        }
        process.nextTick(function(){
            cb(err, feed);
        });
    },

    purge: function(err, name, cb) {
        if (! err) {
            console.log(name.red + " removed from the database.");
        }
        process.nextTick(function(){
            cb(err);
        });
    },

    list: function(err, items, cb){
        if (! err) {
            if (items.length === 0) {
                console.log('Empty here :(');
            } else {
                console.log('Your RSS feeds'.yellow.bold);
                for (var i = 0, len = items.length; i < len; i++) {
                    console.log(items[i].name.cyan);
                }
            }
        }
        process.nextTick(function(){
            cb(err, items);
        });
    },

    read: function(err, item, cb){
        console.log('- - - - - - - - - - - - - - - -');
        console.log(item.title.bold);
        console.log(fancyTimeStamp(item.pubdate, true).grey);
        console.log(item.link.magenta);

        process.nextTick(function(){
            cb(err, item);
        });
    }
}
