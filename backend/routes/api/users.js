var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var CourseProgress = mongoose.model('CourseProgress');
var Course = mongoose.model('Course');
const moment = require('moment');
var auth = require('../auth');
var PredefiendPath = mongoose.model('PredefiendPath');

router.get('/user', auth.required, function (req, res, next) {

  Promise.all([
    User.findById(req.payload.id).populate({
      path: 'path', populate: {
        path: 'courses',
        model: 'Course',
        populate: {
          path: 'stages',
          model: 'Stage'
        }
      }

    }),
    CourseProgress.find({ user: ObjectId(req.payload.id) }),
    Course.find()


  ])

    .then(function ([user, progress, courses]) {
      if (!user) { return res.sendStatus(401); }


      let userToReturn = { ...user.toAuthJSON(), progress };

      return res.json({ user: userToReturn });
    }).catch(next);
});


router.get('/', auth.optional, (req, res, next) => {
  var query = {};
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  return Promise.all([
    User.find(query)
      .populate({
        path: 'path', populate: {
          path: 'courses',
          model: 'Course',
          populate: {
            path: 'stages',
            model: 'Stage'
          }
        }

      })
      .limit(Number(limit))
      .skip(Number(offset))
      .sort({ createdAt: 'desc' })
      .exec(),
    User.count(query).exec(),
  ]).then((results) => {
    const [users, usersCount] = results;
    return res.json({
      users, usersCount
    });

  });
});



router.put('/user/:id', auth.required, async function (req, res, next) {
  User.findById(req.params.id || req.payload.id).then(async (user) => {
    if (!user) { return res.sendStatus(401); }

    // only update fields that were actually passed...
    if (typeof req.body.user.username !== 'undefined') {
      user.username = req.body.user.username;
    }


    if (typeof req.body.user.name !== 'undefined') {
      user.name = req.body.user.name;
    }

    if (typeof req.body.user.lastname !== 'undefined') {
      user.lastname = req.body.user.lastname;
    }

    if (typeof req.body.user.phone !== 'undefined') {
      user.phone = req.body.user.phone;
    }

    if (typeof req.body.user.phone !== 'undefined') {
      user.phone = req.body.user.phone;
    }

    if (typeof req.body.user.headingTo !== 'undefined') {
      user.headingTo = req.body.user.headingTo;
    }

    if (typeof req.body.user.priorKnowledge !== 'undefined') {
      user.priorKnowledge = req.body.user.priorKnowledge;
    }
    if (typeof req.body.user.email !== 'undefined') {
      user.email = req.body.user.email;
    }
    if (typeof req.body.user.path !== 'undefined') {
      user.path = req.body.user.path;

      const path = await PredefiendPath.findOne({ _id: user.path }).exec()

      const progress = path.courses.map(x => new CourseProgress({ user: user, course: x }))
      await CourseProgress.insertMany(progress);
    }
    if (typeof req.body.user.image !== 'undefined') {
      user.image = req.body.user.image;
    }
    if (typeof req.body.user.password !== 'undefined') {
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function () {
      return res.json({ user: user.toAuthJSON() });
    });
  }).catch(next);
});




router.post('/users/login', function (req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      user.token = user.generateJWT();

      req.session.token = user.token;
      req.session.save(() => {
        return res.json({ user: user.toAuthJSON() });
      });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users/logout', (req, res, next) => {

  req.session.destroy((err) => {

    if (err) next(err);
    return res.status(200).end();
  })


})

router.post('/users', function (req, res, next) {
  let user = new User(req.body.user);

  user.setPassword(req.body.user.password);

  user.save().then(function () {
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

module.exports = router;
