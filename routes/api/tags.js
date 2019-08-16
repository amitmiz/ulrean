var router = require('express').Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');

// return a list of tags
router.get('/', function(req, res, next) {
  Question.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});

module.exports = router;
