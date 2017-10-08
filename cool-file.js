var unsplash = require('unsplash-api');
var config = require('./config.js');
var data = require('./database.js');
var clientId = process.env.Client_ID || config.keys.Client_ID;
unsplash.init(clientId);

var db;

data.connectToServer(function (err) {
    db = data.getDB();

});

module.exports.get = function (req, res) {

    var search = req.params[0];
    var offset = req.query.offset;
    var isodate = new Date().toISOString()

    var term = {
        'Term': search,
        'Date': isodate
    }

    db.collection('latestsearch').insert(term, function (err, doc) {

        if (err) throw err;
        console.log('Inserted Document');

    });

    unsplash.searchPhotos(search, [1, 2, 3], 1, offset, function (error, photos, link) {
        var _ = require('lodash');

        var data = _.map(photos, (entry) => {

            return {
                URL: entry.urls.small,
                Thumbnail: entry.urls.thumb,
                Download: entry.links.download,
                Publisher: entry.user.links.html
            };

        });

        if (data.length === 0) {
            res.json({
                Error: 'No Images found try another search Term'
            })
        } else {

            res.json(data)
        }

    });

}
