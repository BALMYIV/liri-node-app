var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys');
//var twitterKeys = keys.twitterKeys;


callLiri(process.argv[2], process.argv[3]);

function callLiri(a,b){

        if(a === 'my-tweets' ){
            twitter1();
            console.log("callLiri test");
        }else if(a === 'spotify-this-song') {
            spotify1(b);
            //console.log('spotifail');
        }else if(a === 'movie-this'){
            movie(b);
        }else if(a === 'do-what-it-says'){
            fs.readFile("random.txt", "utf8", function(error, data) {
                var doWhat = data.split(",");
                callLiri(doWhat[0],doWhat[1]);
        });
        }
}

function twitter1(b){
	console.log("tweet test test");
	var client = new Twitter(keys);
 
var params = {screen_name: 'felboniousBelg'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < 20; i++) {
    	var tweetTweaks = "@"+tweets[0].user.screen_name + '\n' +
    					  tweets[i].text + '\n' +
    					  tweets[i].created_at + '\n';

    	console.log(tweetTweaks);
    }
  }
});
}

function spotify1(b){
	//console.log("hey spotty otty");
	if (b == undefined) {
		b = "Ace of base The Sign" };
	/////console.log(b);

var spotify = new Spotify({
  id: "605d9e035edb4ed791c37533c80db0dd",
  secret: "753d92ccb96341bfb228852164df9ad4"
});
 
spotify.search({ type: 'track', query: b }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
var music = data.tracks.items[0];
  console.log(music.album.artists[0].name +'\n' +
  				music.name + "\n" + 
  				music.preview_url) +'\n'+
  				music.album.name; 
	}); 
}

function movie(b){
	if (b === undefined){
		b = 'Mr. Nobody'}
	//console.log(b);
	var imdbUrl = `http://www.omdbapi.com/?apikey=40e9cece&t= ${b} &r=json`;
	request(imdbUrl, function(error, response, body){
		if (!error && response.statusCode === 200) {
			movieObject = JSON.parse(body);
			//console.log(movieObject)
			console.log(movieObject.Title);
			console.log(movieObject.Year);
			console.log(movieObject.imdbRating);
			console.log(movieObject.Country);
			console.log(movieObject.Language);
			console.log(movieObject.Plot);
			console.log(movieObject.Actors);
		}
	});

}








