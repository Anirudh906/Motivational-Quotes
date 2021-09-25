const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URL;
mongoose
  .connect(URL)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));
const GetQuotes = (Online) => {
    if(Online){
    axios.get("https://www.brainyquote.com/topics/motivational-quotes")
         .then((res) => {
             console.log(res);
         })
         .catch((err) => {
             console.log(err);
         });
        }
        else{

        }
  
};

module.exports = GetQuotes;
