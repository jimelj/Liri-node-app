/*jshint esversion: 6 */
const keys = require('./keys.js');
const request = require("request");
var Twitter = require('twitter');
const spotify = require('spotify');


const consumerKey = keys.twitterKeys.consumer_key;
const consumerSecret = keys.twitterKeys.consumer_secret;
const tokenKey = keys.twitterKeys.access_token_key;
const tokenSecret = keys.twitterKeys.access_token_secret;

let command = process.argv[2];
let value = process.argv.slice(3);
switch (command) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifyThis();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhat();
    break;
}


function movieThis() {
  value = value.join('+');
  console.log('this is value', value);
  let queryUrl = 'http://www.omdbapi.com/?t=' + value + '&y=&plot=short&r=json&tomatoes=true';
  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      let {Title,Year,imdbRating,Country,Language,Plot,Actors,Ratings,tomatoURL} = JSON.parse(body);
      console.log("==========================================================================================================================");
      console.log(' ');
      console.log(Title);
      console.log('Year:',Year);
      console.log('IMDB Rating:',imdbRating);
      console.log('Countries:',Country);
      console.log('Languages:',Language);
      console.log(Plot);
      console.log('Actors:',Actors);
      for (var i = 0; i < Ratings.length; i++) {
        if(Ratings[i].Source === 'Rotten Tomatoes'){
        console.log(Ratings[i].Source+':', Ratings[i].Value);
        }
      }
      console.log(tomatoURL);
      console.log(' ');
      console.log("==========================================================================================================================");

    }

  });
}

function spotifyThis() {
  // value = value.join(' ');

  spotify.search({
    type: 'track',
    query: value,
    limit: 1
  }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    console.log(JSON.stringify(data, null, 2));
    // Do something with 'data'
  });
}

function myTweets() {
  let client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: tokenKey,
    access_token_secret: tokenSecret
  });

  let params = {
    screen_name: 'jimelj'
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < 19; i++) {
        // console.log(JSON.stringify(tweets[i], null, 2));
        console.log("==========================================================================================================================");
        console.log(' ');
        console.log(tweets[i].text);
        console.log('Post it on: ' + tweets[i].created_at);
        console.log(' ');
        console.log("==========================================================================================================================");
      }
    }
  });
}
