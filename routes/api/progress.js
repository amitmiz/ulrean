let router = require('express').Router();
let mongoose = require('mongoose');
let CourseProgress = mongoose.model('CourseProgress');
let Course = mongoose.model('Course');
let User = mongoose.model('User');
let auth = require('../auth');
const moment = require('moment')



// return a courseProgress
router. get('/', auth.required, (req, res, next) => {
  CourseProgress.findOne({ user: req.payload.id, course: req.param("courseProgress") })
    .then((progress) => {

      return res.json({ courseProgress: progress.toJSON() });
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

  Promise.all([Course.findOne({ _id: req.param("courseProgress") }), CourseProgress.findOne({ user: req.payload.id, course: req.param("courseProgress") })]).then(([course, progress]) => {

    if (typeof req.body.courseProgress.stagesCompleted !== 'undefined') {


      if (req.body.courseProgress.stagesCompleted) {
        progress.stagesCompleted = req.body.courseProgress.stagesCompleted


        if (course.stages.length === progress.stagesCompleted) {
          progress.completed = true;
        }


      }

      if (!progress.started) {
        progress.started = new Date();
        progress.recomendedTimeToFinish = course.recomendedTimeToFinish;
        progress.dueDate = moment(progress.started).add(course.recomendedTimeToFinish, "days");
      }



    }

    progress.save().then((courseProgress) => {
      return res.json({ courseProgress: courseProgress.toJSON() });
    })


  }).catch(next);



});



module.exports = router;
