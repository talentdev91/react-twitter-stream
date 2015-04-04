var Sequelize = require('sequelize');
var sequelize = require('../sequelize');

var Tweet = sequelize.define('Tweet', {
  tweetId: Sequelize.STRING,
  active: Sequelize.BOOLEAN,
  author: Sequelize.STRING,
  avatar: Sequelize.STRING,
  body: Sequelize.STRING,
  date: Sequelize.DATE,
  screenName: Sequelize.STRING
});

Tweet.perPage = 10;

Tweet.getTweets = function(options, callback) {
  options = options || {};

  var perPage = parseInt(options.perPage)  || Tweet.perPage;
  var page    = parseInt(options.page, 10) || 0;
  var skip    = parseInt(options.skip, 10) || 0;
  var offset = page * perPage + skip;

  Tweet.findAll({
    offset: offset,
    limit: perPage,
    order: "date DESC"
  }).then(function(tweets) {
    tweets.forEach(function(tweet) {
      tweet.active = true;
    });

    callback(tweets);
  });
};

module.exports = Tweet;
