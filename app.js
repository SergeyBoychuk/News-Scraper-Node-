var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var app = express();
var port = 8000;

var destination = fs.createWriteStream('./downloads/google2.html');
var url = 'http://google.com';

request(url)
    .pipe(destination)
    .on('finish', () => {
        console.log('done');
    })
    .on('error' ,(err) => {
        console.log(err);
    })

// var url = 'http://google.com';
// request(url, function(err, res, body) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(body);
//     }
// })

app.listen(port);
console.log('server is listening on ' + port);