var data = require('./database.js');
var db;

data.connectToServer(function (err) {
    db = data.getDB();

});

module.exports = function (req, res) {

    var terms = db.collection('latestsearch').find().limit(10).sort({
        $natural: -1
    }).toArray(function (err, ans) {

        if (err) throw err;

        if (ans.length > 0) {
            var _ = require('lodash');

            var db_search = _.map(ans, (entry) => {

                return {
                    Terms: entry.Term,
                    Date: entry.Date
                };

            });

            res.json(db_search)
        } else {
            res.send('The link was not found')
        }
    });


}
