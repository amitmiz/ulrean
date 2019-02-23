var router = require('express').Router();
var mongoose = require('mongoose');
var Stage = mongoose.model('Stage');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload stage objects on routes with ':stage'
router.param('stage', function(req, res, next, _id) {
  Stage.findOne({ _id: _id})
    .then(function (stage) {
      if (!stage) { return res.sendStatus(404); }

      req.stage = stage;

      return next();
    }).catch(next);
});

router.get('/', auth.optional, function(req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tags = {"$in" : [req.query.tag]};
  }

  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
  ]).then(function(results){
    var author = results[0];
    return Promise.all([
      Stage.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .exec(),
      Stage.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var stages = results[0];
      var stagesCount = results[1];
      var user = results[2];

      return res.json({
        stages: stages.map(function(stage){
          return stage.toJSONFor(user);
        }),
        stagesCount: stagesCount
      });
    });
  }).catch(next);
});



router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }
    var stage = new Stage(req.body.stage);
    return stage.save().then(function(){
      return res.json({stage: stage.toJSONFor(user)});
    }).catch(next);
  })
});

// return a stage
router.get('/:stage', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
  ]).then(function(results){
    var user = results[0];

    return res.json({stage: req.stage.toJSONFor(user)});
  }).catch(next);
});

// update stage
router.put('/:stage', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.stage.author._id.toString() === req.payload.id.toString()){
      
      if(typeof req.body.stage.title !== 'undefined'){
        req.stage.title = req.body.stage.title;
      }

      if(typeof req.body.stage.description !== 'undefined'){
        req.stage.description = req.body.stage.description;
      }

      if(typeof req.body.stage.body !== 'undefined'){
        req.stage.body = req.body.stage.body;
      }

      if(typeof req.body.stage.tagList !== 'undefined'){
        req.stage.tagList = req.body.stage.tagList
      }

      req.stage.save().then(function(stage){
        return res.json({stage: stage.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete stage
router.delete('/:stage', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.stage.author._id.toString() === req.payload.id.toString()){
      return req.stage.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});


module.exports = router;
