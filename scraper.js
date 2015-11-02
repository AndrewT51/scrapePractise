var fs= require('fs');
var got = require('got')
var cheerio = require('cheerio')
got('https://en.wikipedia.org/wiki/List_of_National_Historic_Landmarks_in_California', function (err,html) {
var $ = cheerio.load(html);
var jsonObj = {};

$('.wikitable .vcard>td:nth-child(2)').each(function(index){
 jsonObj[index + 1]= {name: $(this).text() }
}) 

$('.wikitable .vcard>td:nth-child(3) div div>a>img').each(function(index){
 jsonObj[index + 1].pic= 'https:' + (/ \/\/.+/).exec($(this).attr('srcset'))
 jsonObj[index+1].pic = jsonObj[index + 1].pic.replace(/ +|(2x)/g, '');
}) 
$('.wikitable .vcard>td:nth-child(5)').each(function(index){
 jsonObj[index +1 ].location = (/\d.+W/).exec($(this).text());
 if(jsonObj[index+1].location){
  jsonObj[index+1].location = jsonObj[index+1].location[0] || 0;
 }
}) 
console.log(jsonObj)
fs.writeFile('json.json', JSON.stringify(jsonObj), function (err) {
  if (err) return console.log(err);
 
});

})

//to run scraper tutorial run nutella-scrape
