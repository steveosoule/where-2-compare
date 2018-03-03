// DB
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('requests/cache.json')
const db = low(adapter)

const request = require('request');
const cheerio = require('cheerio');

const URL = require('url');

// Main Custom Code

const get_set_url = function(url, callback){

  var cached_body = db.get('requests.' + url).value();

  console.log('cached_body', cached_body);

  if( !!cached_body ){
    console.log('get_set_url', 'Using cache...', url);
    callback(cached_body);
    return;
  }

  var options = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'
    }
  }

  console.log('get_set_url', 'Requesting...', url);

  request(options, function(error, response, body){
    if (error || response.statusCode !== 200) {
      console.error('ERROR', error, response, body);
      return false;
    }

    db.set('requests.' + options.url, body).write();

    callback(body);
  });

};

var download = {};
download.url = 'http://www.example.com/something.html';
download.callback = function(body) {
  var $ = cheerio.load(body);

  var $links = $('#foo a');

  var links = $links.map(function(i, link){
    var $link = $(link);

    var link_obj = {};

    link_obj.href = $link.attr('href');
    link_obj.title = $link.text();
    link_obj.url = download.url + '/' + link_obj.href;


    return link_obj;
  }).toArray();

  db.set('data.foo', links).write();
};

get_set_url(download.url, download.callback);