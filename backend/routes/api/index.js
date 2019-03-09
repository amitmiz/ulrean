var router = require('express').Router();

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/questions', require('./questions'));
router.use('/courses', require('./courses'));
router.use('/stages', require('./stages'));
router.use('/tags', require('./tags'));
router.use('/predefiend-pathes', require('./predefiendPathes'));
router.use('/progress', require('./progress'));
router.use('/submissions', require('./submissions'));
router.use('/stats', require('./statistics'));

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
