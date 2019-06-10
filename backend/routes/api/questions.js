var router = require('express').Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload question objects on routes with ':question'
router.param('question', function (req, res, next, _id) {
  Question.findOne({ _id: _id })
    .populate('author')
    .populate("comments")
    .then(function (question) {
      if (!question) { return res.sendStatus(404); }

      req.question = question;

      return next();
    }).catch(next);
});

router.param('comment', function (req, res, next, id) {
  Comment.findById(id).then(function (comment) {
    if (!comment) { return res.sendStatus(404); }

    req.comment = comment;

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
      Question.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .populate("comments")
        .exec(),
      Question.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function (results) {
      var questions = results[0];
      var questionsCount = results[1];
      var user = results[2];

      return res.json({
        questions: questions.map(function (question) {
          return question.toJSONFor(user);
        }),
        questionsCount: questionsCount
      });
    });
  }).catch(next);
});

router.get('/feed', auth.required, function (req, res, next) {
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Question.find({ author: { $in: user.following } })
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      Question.count({ author: { $in: user.following } })
    ]).then(function (results) {
      var questions = results[0];
      var questionsCount = results[1];

      return res.json({
        questions: questions.map(function (question) {
          return question.toJSONFor(user);
        }),
        questionsCount: questionsCount
      });
    }).catch(next);
  });
});

router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then((user) => {
    if (!user) { return res.sendStatus(401); }

    var question = new Question(req.body.question);

    question.author = user;

    return question.save().then(() => {
      return res.json({ question: question.toJSONFor(user) });
    });
  }).catch(next);
});

// return a question
router.get('/:question', auth.optional, function (req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.question.populate('author').execPopulate()
  ]).then(function (results) {
    var user = results[0];

    return res.json({ question: req.question.toJSON() });
  }).catch(next);
});

// update question
router.put('/:question', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (req.question.author._id.toString() === req.payload.id.toString()) {
      if (typeof req.body.question.title !== 'undefined') {
        req.question.title = req.body.question.title;
      }

      if (typeof req.body.question.description !== 'undefined') {
        req.question.description = req.body.question.description;
      }

      if (typeof req.body.question.body !== 'undefined') {
        req.question.body = req.body.question.body;
      }

      if (typeof req.body.question.tagList !== 'undefined') {
        req.question.tagList = req.body.question.tagList
      }

      req.question.save().then(function (question) {
        return res.json({ question: question.toJSONFor(user) });
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete question
router.delete('/:question', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    if (req.question.author._id.toString() === req.payload.id.toString()) {
      return req.question.remove().then(function () {
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// return an question's comments
router.get('/:question/comments', auth.optional, function (req, res, next) {
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function (user) {
    return req.question.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function (question) {
      return res.json({
        comments: req.question.comments.map(function (comment) {
          return comment.toJSONFor(user);
        })
      });
    });
  }).catch(next);
});

// create a new comment
router.post('/:question/comments', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var comment = new Comment(req.body.comment);
    comment.question = req.question;
    comment.author = user;

    return comment.save().then(function () {
      req.question.comments.push(comment);

      return req.question.save().then(function (question) {
        res.json({ comment: comment.toJSON() });
      });
    });
  }).catch(next);
});

router.delete('/:question/comments/:comment', auth.required, function (req, res, next) {
  if (req.comment.author.toString() === req.payload.id.toString()) {
    req.question.comments.remove(req.comment._id);
    req.question.save()
      .then(Comment.find({ _id: req.comment._id }).remove().exec())
      .then(function () {
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
