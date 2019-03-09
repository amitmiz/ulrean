let router = require('express').Router();
let mongoose = require('mongoose');
let CourseProgress = mongoose.model('CourseProgress');
let Course = mongoose.model('Course');
let User = mongoose.model('User');
let auth = require('../auth');
const moment = require('moment')


router.get('/unfinishedPathUsers', (req, res) => {



  User.aggregate([

    { $match: { type: 'student' } },
    { $lookup: { from: 'courseprogresses', localField: '_id', foreignField: 'user', as: 'progress' } },
    { $match: { "progress.1": { $exists: 1 } } },
    { $match: { "progress.completed": false } }
  ]).then((users) => {
    if (!users) res.status(500).send();

    const result = users.map(user => {
      let now = moment();
      let copyuser = Object.assign({}, user)
      const unfinshedCourses = copyuser.progress.filter(x => x.completed === false).map(x => {
        let progress = Object.assign({}, x);
        let dateAsMoment = moment(progress.started);
        progress.passedBy = now.diff(dateAsMoment, "days");

        return progress;

      });
      return {
        user: copyuser,
        unfinshedCourses

      }

    })
    res.json(result);
  })

})


router.get('/finishedPathUsers', (req, res) => {
  User.aggregate([

    { $match: { type: 'student' } },
    { $lookup: { from: 'courseprogresses', localField: '_id', foreignField: 'user', as: 'progress' } },
    { $match: { "progress.1": { $exists: 1 } } }
  ]).then((users) => {
    if (!users) res.status(500).send();
    const finishedUsers = users.filter(user => {
      return user.progress.every(x => {
        return x.completed === true;
      })
    });

    res.json(finishedUsers);
  })
})


module.exports = router;
