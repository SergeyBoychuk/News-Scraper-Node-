const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');

var app = express();
var port = 8000;



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/data.html'));
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// let url = 'http://wfla.com/category/news/sarasota-county-florida/';
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
})


const newsHeader = document.getElementById('news-headline');
newsHeader.textContent('hello');









// let titleOfLink = $('.entry-title a');
        
        
//         let data = {
//             titles: [],
//             summarys: []
//         }
//         const titles = [];
        
 
//         $('.media-object').each(function(i, elem) {
            
            

//             data.titles[i] = $('.entry-header .entry-title a').get(i).children[0].data;
//             data.summarys[i] = $('.entry-summary p').get(i).children[0].data;
//         });

//         console.log(data.titles);
//         console.log(data.summarys);








































// let companyName = $('.company');
    // let companyNameText = companyName.text();
   
 

    // let jobTitle = $('.turnstileLink');;
    // let jobTitleText = jobTitle.text();

    // let location = $('.location');
    // let locationText = location.text();

    // let summary = $('.summary');
    // let summaryText = summary.text();
    
    // var job = {
    //     jobTitle: jobTitleText,
    //     location: locationText,
    //     companyName: companyNameText,
    //     summary: summaryText
    // }
    // console.log(job);

    // request(url)
//     .pipe(destination)
//     .on('finish', () => {
//         console.log('done');
//     })
//     .on('error' ,(err) => {
//         console.log(err);
//     })