var unsplash = require('unsplash-api');
var config = require('./config.js');

var clientId = process.env.Client_ID || config.keys.Client_ID;

console.log(clientId);
    //'d766545634a38c69e5c8c4023a9e5e986c9b54552a08bca6f156c7cc3402d2c3'; 
unsplash.init(clientId);


const https = require('https');



module.exports.get = function (req, res) {

  var search = req.params[0];
     console.log(search);
  
  var offset = req.query.offset;
  
    console.log(offset);

unsplash.searchPhotos('dog', [1, 2, 3], 1, 5, function(error, photos, link) {
  
  //var num = [].concat.apply(photos);

  
  //var test = photos.substring(1, num);
  
  res.json(photos)
  
});
  
  
  
}