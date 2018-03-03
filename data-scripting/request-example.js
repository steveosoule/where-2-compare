var request = require('request');
const cheerio = require('cheerio');

var options = {
  url: 'http://www.city-data.com/states/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'
  }
};

function callback(error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR', error, response, body);
    return false;
  }

  // console.log('response', response);
  // console.log('body', body);
  
  var $ = cheerio.load(body);

  var $links = $('#group_list a');

  var links = $links.map(function(i, link){
    var $link = $(link);
    return {
      link: $link.attr('href'),
      title: $link.text()
    }
  });

  console.log(links);
  
}

request(options, callback);