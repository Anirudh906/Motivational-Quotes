const axios = require("axios");
const quotesDB = require('./quotes.json');
const chalk = require('chalk');
require("dotenv").config();
const yosay = require("yosay");
const cowsay = require("cowsay");
const chalkAnimation = require("chalk-animation");
const fs = require("fs");




function print(q, a){
chalkAnimation.rainbow("Loading...");
setTimeout(() => {

  console.log(chalk.underline.magenta.bold("\nStay Motivated...\n"));
console.log(
  yosay(
    ["", "    " + chalk.green.bold(q), "        -- " + chalk.cyan(a), ""].join("\n")
  )
);
}, 1000);
}



function appendQuote(obj, quotesDB){
  var outputFile = "./quotes.json";
  var j = 0;
  for(j = 0; j < quotesDB.length; j++){
    if(quotesDB[j]["quote"] == obj["quote"]) break;

    if(j == quotesDB.length - 1) quotesDB.push(obj);
  }
   
 
  fs.writeFile(outputFile, JSON.stringify(quotesDB, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	     
	    }
   });
 }

function getAllQuotes(res){
  var quote = res.data[0].q;
  var auth = res.data[0].a;
  

  var obj = {
    "quote": quote,
    "author": auth
  }
  
  
  appendQuote(obj, quotesDB);
  return obj; 

}



function randomIdx(len) {
  return parseInt(Math.random() * 100) % len;
}


function printQuote(q, a) {
 chalkAnimation.pulse("Loading Offline version...");
 setTimeout(() => {
   console.log(
     cowsay.say({
       text: ["", chalk.green.bold(q), "        -- " + chalk.cyan(a), ""].join(
         "\n"
       ),
       e: "OO",
       T: "U",
     })
   );
 }, 1000);
 
}

const GetQuotes = (Online) => {
    if(Online){
   
   
        axios
          .get("https://zenquotes.io/api/random")
          .then((res) => {
        
            var obj = getAllQuotes(res);
            print(obj.quote, obj.author);
       
          })
          .catch((err) => {
            //console.log(err);
            const idx = randomIdx(quotesDB.length - 1);
            print(quotesDB[idx]["quote"], quotesDB[idx]["author"]);
          });


        }
        else{
           
           
            var idx = randomIdx(quotesDB.length - 1);
            printQuote(quotesDB[idx]["quote"], quotesDB[idx]["author"]);
            
        }
  
};

module.exports = GetQuotes;
