var mongoose = require("mongoose");

 var Schema = mongoose.Schema;

 var nytreact = new Schema({
    title: String,
    date: Date,
    url: String
  });
  
  var Article = mongoose.model("Article", nytreact);
  
  module.exports = Article;