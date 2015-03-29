var Tweet = require('../models/Tweet');

module.exports = function(stream, io) {

  stream.on('data', function(data) {

    var tweet = Tweet.build({
      tweetId: data.id,
      active: false,
      author: data.user.name,
      avatar: data.user.profile_image_url,
      body: data.text,
      date: data.created_at,
      screenName: data.user.screen_name
    });

    console.log(tweet.get('body'));
  });
};
