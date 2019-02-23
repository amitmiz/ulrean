let router = require('express').Router();
let mongoose = require('mongoose');
let CourseProgress = mongoose.model('CourseProgress');
let Course = mongoose.model('Course');
let User = mongoose.model('User');
let auth = require('../auth');

// Preload courseProgress objects on routes with ':courseProgress'
router.param('courseProgress', function (req, res, next, course) {
  CourseProgress.findOne({ course: course })
    .then((courseProgress) => {
      if (!courseProgress) { return res.sendStatus(404); }

      req.courseProgress = courseProgress;

      return next();
    }).catch(next);
});

router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }
    var courseProgress = new CourseProgress(req.body.courseProgress);
    return courseProgress.save().then(function () {
      return res.json({ courseProgress: courseProgress.toJSONFor(user) });
    }).catch(next);
  });
});

// return a courseProgress
router.get('/:courseProgress', auth.required, function (req, res, next) {
  CourseProgress.findOne({ user: req.payload.id, course: req.param("courseProgress") })
    .then((progress) => {

      return res.json({ courseProgress: progress.toJSON() });
    }).catch(next);
});

// update courseProgress
router.put('/:courseProgress', auth.required, (req, res, next) => {

  Course.findOne({ _id: req.courseProgress.course }).then((course) => {

    if (typeof req.body.courseProgress.stagesCompleted !== 'undefined') {


      //   req.courseProgress.stagesCompleted = req.body.courseProgress.stagesCompleted == 0 ? 1 : req.body.courseProgress.stagesCompleted;

      req.courseProgress.stagesCompleted = req.body.courseProgress.stagesCompleted
      if (course.stages.length === req.courseProgress.stagesCompleted) {
        req.courseProgress.completed = true;
      }
    }

    req.courseProgress.save().then((courseProgress) => {
      return res.json({ courseProgress: courseProgress.toJSON() });
    })


  }).catch(next);



});

// delete courseProgress
router.delete('/:courseProgress', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    if (req.courseProgress.author._id.toString() === req.payload.id.toString()) {
      return req.courseProgress.remove().then(function () {
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});


module.exports = router;
