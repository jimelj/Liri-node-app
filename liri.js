/*jshint esversion: 6 */
const keys = require('./keys.js');
const request = require("request");
const Twitter = require('twitter');
const spotify = require('spotify');
const fs = require("fs");


const consumerKey = keys.twitterKeys.consumer_key;
const consumerSecret = keys.twitterKeys.consumer_secret;
const tokenKey = keys.twitterKeys.access_token_key;
const tokenSecret = keys.twitterKeys.access_token_secret;

let command = process.argv[2];
let value = process.argv.slice(3);
ckCommand();
function ckCommand(){
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
    doWhat(command);
    break;
}
}

function movieThis() {
  if (value.length === 0) {
    value.push('Mr. Nobody');
  }
  value = value.join('+');
  console.log('this is value', value);
  let queryUrl = 'http://www.omdbapi.com/?t=' + value + '&y=&plot=short&r=json&tomatoes=true';
  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      let {
        Title,
        Year,
        imdbRating,
        Country,
        Language,
        Plot,
        Actors,
        Ratings,
        tomatoURL
      } = JSON.parse(body);
      console.log("==========================================================================================================================");
      console.log(' ');
      console.log(Title);
      console.log('Year:', Year);
      console.log('IMDB Rating:', imdbRating);
      console.log('Countries:', Country);
      console.log('Languages:', Language);
      console.log(Plot);
      console.log('Actors:', Actors);
      for (var i = 0; i < Ratings.length; i++) {
        if (Ratings[i].Source === 'Rotten Tomatoes') {
          console.log(Ratings[i].Source + ':', Ratings[i].Value);
        }
      }
      console.log(tomatoURL);
      console.log(' ');
      console.log("==========================================================================================================================");

    }
  });
}
function spotifyThis() {
  if (value.length === 0) {
    value.push('The Sign');
    value.push('Ace of Base');
  }
  value = value.join(' ');
  console.log(value);
  spotify.search({
    type: 'track',
    query: value,
    limit: 1
  }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    let {
      artists,
      name,
      preview_url,
      album
    } = data.tracks.items[0];
    console.log("==========================================================================================================================");
    console.log(' ');
    console.log(artists[0].name);
    console.log('Song:', name);
    console.log(preview_url);
    console.log('Album:', album.name);
    console.log(' ');
    console.log("==========================================================================================================================");

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
    screen_name: 'jimelj',
    count: 20
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {

        console.log("==========================================================================================================================");
        console.log(' ');
        console.log(tweets[i].text);
        console.log('Posted on: ' + tweets[i].created_at);
        console.log(' ');
        console.log("==========================================================================================================================");
      }
    }
  });
}

function doWhat(){
  fs.readFile('./random.txt', 'utf8', function (err,data) {
  if (err) {
    throw err;
  }
  console.log(data);
  data = data.split(',');
  command = data[0];
  value = data[1].split(' ');
  console.log(command);
  console.log(value);
  ckCommand();
});
}
