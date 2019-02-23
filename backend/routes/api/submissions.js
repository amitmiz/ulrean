var router = require('express').Router();
var mongoose = require('mongoose');
var Submission = mongoose.model('ProjectSubmission');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload submission objects on routes with ':submission'
router.param('submission', function (req, res, next, id) {
    Submission.findById(id).populate("user").populate("stage").populate("testResult.teacher")

        // .populate({
        //     path: 'testResult', populate: {
        //         path: 'teacher',
        //         model: 'User'
        //     }
        // })

        .then(function (submission) {
            if (!submission) { return res.sendStatus(404); }

            req.submission = submission;

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
            Submission.find(query).populate("user").populate("stage").populate("testResult.teacher")
                .limit(Number(limit))
                .skip(Number(offset))
                .sort({ createdAt: 'desc' })
                .exec(),
            Submission.count(query).exec(),
            req.payload ? User.findById(req.payload.id) : null,
        ]).then(function (results) {
            var submissions = results[0];
            var submissionsCount = results[1];
            var user = results[2];

            return res.json({
                submissions: submissions.map(submission => submission.toJSON()),
                submissionsCount: submissionsCount
            });
        });
    }).catch(next);
});



router.post('/', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        let newSubmission = Object.assign({}, req.body.submission);
        newSubmission.user = user;
        let submission = new Submission(newSubmission);
        return submission.save().then(() => {
            return res.json({ submission: submission.toJSON() });
        }).catch(next);
    })
});

// return a submission
router.get('/:submission', auth.optional, function (req, res, next) {
    Promise.all([
        req.payload ? User.findById(req.payload.id) : null,
    ]).then(function (results) {
        var user = results[0];

        return res.json({ submission: req.submission.toJSON() });
    }).catch(next);
});

// return a submission
router.get('/stage/:stage', auth.required, function (req, res, next) {
    Promise.all([
        Submission.find({ user: req.payload.id, stage: req.param("stage") }).populate("user").populate("stage").populate("testResult.teacher")
    ]).then(function (results) {
        var submissions = results[0];
        return res.json({ submissions: submissions.map(sub => sub.toJSON()) });
    }).catch(next);
});

// update submission
router.put('/:submission', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {


        if (typeof req.body.submission.testResult !== 'undefined') {
            req.submission.testResult = req.body.submission.testResult;
        }

        req.submission.save().then((submission) => {
            return res.json({ submission: submission.toJSON() });
        }).catch(next);

    });
});

// delete submission
router.delete('/:submission', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        if (req.submission.author._id.toString() === req.payload.id.toString()) {
            return req.submission.remove().then(function () {
                return res.sendStatus(204);
            });
        } else {
            return res.sendStatus(403);
        }
    }).catch(next);
});


module.exports = router;
