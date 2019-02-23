var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var PredefiendPathSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]

}, { timestamps: true });

//PredefiendPathSchema.plugin(uniqueValidator, { message: 'is already taken' });

PredefiendPathSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

PredefiendPathSchema.methods.slugify = function () {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};


PredefiendPathSchema.methods.toJSONFor = function (user) {
  return {
    _id: this._id,
    slug: this.slug,
    name: this.name,
    courses: this.courses,

  };
};

mongoose.model('PredefiendPath', PredefiendPathSchema);
