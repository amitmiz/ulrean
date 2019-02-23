var router = require('express').Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload course objects on routes with ':course'
router.param('course', function (req, res, next, _id) {
  Course.findOne({ _id: _id })
    .populate("stages")
    .then(function (course) {
      if (!course) { return res.sendStatus(404); }

      req.course = course;

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
    query.tagList = { "$in": [req.query.tag] };
  }

  Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
    req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
  ]).then(function (results) {
    var author = results[0];
    var favoriter = results[1];

    if (author) {
      query.author = author._id;
    }

    if (favoriter) {
      query._id = { $in: favoriter.favorites };
    } else if (req.query.favorited) {
      query._id = { $in: [] };
    }

    return Promise.all([
      Course.find(query)
        .populate("stages")
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec(),
      Course.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function (results) {
      var courses = results[0];
      var coursesCount = results[1];
      var user = results[2];

      return res.json({
        courses: courses.map(function (course) {
          return course.toJSONFor(user);
        }),
        coursesCount: coursesCount
      });
    });
  }).catch(next);
});



router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }
    var course = new Course(req.body.course);
    return course.save().then(function () {
      return res.json({ course: course.toJSONFor(user) });
    }).catch(next);
  })
});

// return a course
router.get('/:course', auth.optional, function (req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.course.populate('author').execPopulate()
  ]).then(function (results) {
    var user = results[0];

    return res.json({ course: req.course.toJSONFor(user) });
  }).catch(next);
});

// update course
router.put('/:course', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (req.course.author._id.toString() === req.payload.id.toString()) {
      if (typeof req.body.course.title !== 'undefined') {
        req.course.title = req.body.course.title;
      }

      if (typeof req.body.course.description !== 'undefined') {
        req.course.description = req.body.course.description;
      }

      if (typeof req.body.course.body !== 'undefined') {
        req.course.body = req.body.course.body;
      }

      if (typeof req.body.course.tagList !== 'undefined') {
        req.course.tagList = req.body.course.tagList
      }

      req.course.save().then(function (course) {
        return res.json({ course: course.toJSONFor(user) });
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete course
router.delete('/:course', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    if (req.course.author._id.toString() === req.payload.id.toString()) {
      return req.course.remove().then(function () {
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});


module.exports = router;
