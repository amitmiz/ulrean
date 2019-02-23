var router = require('express').Router();
var mongoose = require('mongoose');
var PredefiendPath = mongoose.model('PredefiendPath');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload predefiendPath objects on routes with ':predefiendPath'
router.param('predefiendPath', function (req, res, next, _id) {
  PredefiendPath.findOne({ _id: _id })
    .populate({
      path: 'courses', populate: {
        path: 'stages',
        model: 'Stage'
      }
    })
    .then(function (predefiendPath) {
      if (!predefiendPath) { return res.sendStatus(404); }

      req.predefiendPath = predefiendPath;

      return next();
    }).catch(next);
});

router.get('/', auth.optional, function (req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  if (typeof req.query.tag !== 'undefined') {
    query.tags = { "$in": [req.query.tag] };
  }

  Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
  ]).then(function (results) {
    var author = results[0];
    return Promise.all([
      PredefiendPath.find(query)
        .populate({
          path: 'courses', populate: {
            path: 'stages',
            model: 'Stage'
          }
        })
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .exec(),
      PredefiendPath.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function (results) {
      var PredefiendPaths = results[0];
      var PredefiendPathsCount = results[1];
      var user = results[2];

      return res.json({
        predefiendPaths: PredefiendPaths.map(function (predefiendPath) {
          return predefiendPath.toJSONFor(user);
        }),
        predefiendPathsCount: PredefiendPathsCount
      });
    });
  }).catch(next);
});



router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }
    var predefiendPath = new PredefiendPath(req.body.predefiendPath);
    return predefiendPath.save().then(function () {
      return res.json({ predefiendPath: predefiendPath.toJSONFor(user) });
    }).catch(next);
  })
});

// return a predefiendPath
router.get('/:predefiendPath', auth.optional, function (req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
  ]).then(function (results) {
    var user = results[0];

    return res.json({ predefiendPath: req.predefiendPath.toJSONFor(user) });
  }).catch(next);
});

// update predefiendPath
router.put('/:predefiendPath', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (req.predefiendPath.author._id.toString() === req.payload.id.toString()) {

      if (typeof req.body.predefiendPath.title !== 'undefined') {
        req.predefiendPath.title = req.body.predefiendPath.title;
      }

      if (typeof req.body.predefiendPath.description !== 'undefined') {
        req.predefiendPath.description = req.body.predefiendPath.description;
      }

      if (typeof req.body.predefiendPath.body !== 'undefined') {
        req.predefiendPath.body = req.body.predefiendPath.body;
      }

      if (typeof req.body.predefiendPath.tagList !== 'undefined') {
        req.predefiendPath.tagList = req.body.predefiendPath.tagList
      }

      req.predefiendPath.save().then(function (predefiendPath) {
        return res.json({ predefiendPath: predefiendPath.toJSONFor(user) });
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete predefiendPath
router.delete('/:predefiendPath', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    if (req.predefiendPath.author._id.toString() === req.payload.id.toString()) {
      return req.predefiendPath.remove().then(function () {
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});


module.exports = router;
