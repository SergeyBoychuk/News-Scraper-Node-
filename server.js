const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');
var app = express();

app.set('view engine', 'ejs');

app.get('/' , (req, res) => {
  

  res.render('pages/index', {
    data
  });

});



app.get('/about' , (req, res) => {
  res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');

let url = 'http://www.mysuncoast.com/news/';

let data = [];
console.log(data);



request(url, (err,resp,body) => {
  let $ = cheerio.load(body)

  $('.card-panel.panel').each((i, elem) => {
    try {
      const x = {
        title: $(elem).find('.card-headline a').text().replace(/(\r\n|\n|\r)/gm,"").trim(),
        summary: $(elem).find('.card-lead p').text(),
        image: ($(elem).find('.card-image img').attr('data-srcset') || "").split('?resize')[0]
      }

      data.push(x)      
      
    } catch(e) {
      console.log(e)
    }
  })
  // console.log(data.title);
  // console.log(data.images);



  fs.writeFileSync('./data.json', JSON.stringify(data , null , 2), 'utf-8');
});

