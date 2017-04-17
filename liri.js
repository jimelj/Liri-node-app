/*jshint esversion: 6 */
const keys = require('./keys.js');
const request = require("request");
const Twitter = require('twitter');
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
    console.log('this is value',value);
    let queryUrl = 'http://www.omdbapi.com/?t='+value+'&y=&plot=short&r=json';
    request(queryUrl, function(error, response, body) {

  if (!error &&response.statusCode === 200){
    // console.log(JSON.parse(body));
    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log(JSON.parse(body).imdbRating);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Actors);

    for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
      console.log(JSON.parse(body).Ratings[i].Source +" "+ JSON.parse(body).Ratings[i].Value );
    }

  }

});
}

function spotifyThis(){
  // value = value.join(' ');

  spotify.search({ type: 'track', query: value, limit: 1 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
    // Do something with 'data'
});
}

function myTweets() {



}
