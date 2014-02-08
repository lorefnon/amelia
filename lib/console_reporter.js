var colors = require('colors');
var fancyTimeStamp = require('fancy-timestamp');

var errHandler = function(descr) {
    return function(err) {
        console.error((descr + ' failed').red);
        console.error(err);
    }
}

var successHandler = function(descr) {
    return function(data) {
        console.log((descr + ' was successful').green);
    }
}

var handlerPair = function(descr) {
    return {
        success: successHandler(descr),
        error: errHandler(descr)
    }
}

module.exports = {
    add: {
        success: function(feed) {
            console.log(feed.name.green + " added to the database.");
        },
        error: errHandler('Add feed')
    },

    purge: handlerPair('Deletion of feed'),

    list: {
        success: function(items){
            console.log('Your RSS feeds'.yellow.bold);
            for (var i = 0, len = items.length; i < len; i++) {
                console.log(items[i].name.cyan);
            }
        },
        error: errHandler('Listing of feed')
    },

    read: {
        success: function(items){
            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i];
                console.log('- - - - - - - - - - - - - - - -');
                console.log(item.title.bold);
                console.log(fancyTimeStamp(item.pubdate, true).grey);
                console.log(item.link.magenta);
            }
        },
        error: errHandler('Fetching of feed')
    }
};
