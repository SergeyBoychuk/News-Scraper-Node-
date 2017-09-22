const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');
var app = express();

app.set('view engine', 'ejs');

app.get('/' , (req, res) => {
  let dataDisplayed = [
    data.title,
    data.summary
  ]

  res.render('pages/index', {
    dataDisplayed
  });

});



app.get('/about' , (req, res) => {
  res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');

let url = 'http://www.mysuncoast.com/news/';

let data = {
  title: [],
  summary: []
}



request(url, (err,resp,body) => {
  let $ = cheerio.load(body)

  $('.panel').each((i, elem) => {
    try {
      data.title[i] = $('.card-headline h3 a').get(i).children[0].data.replace(/(\r\n|\n|\r)/gm,"").trim();
      data.summary[i] = $('.card-lead p').get(i).children[0].data;
    } catch(e) {

    }
  })
  console.log(data.title);



  fs.writeFileSync('./data.json', JSON.stringify(data , null , 2), 'utf-8');
});

