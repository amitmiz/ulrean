var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var CourseSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  header: String,

  subheader: String,
  favoritesCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  stages:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Stage' }]

}, { timestamps: true });

//CourseSchema.plugin(uniqueValidator, { message: 'is already taken' });

CourseSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

CourseSchema.methods.slugify = function () {
  this.slug = slug(this.header) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};


CourseSchema.methods.toJSONFor = function(user){
  return {
    _id: this._id,
    slug: this.slug,
    header: this.header,
    subheader: this.subheader,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tags: this.tags,
    stages: this.stages

  };
};

mongoose.model('Course', CourseSchema);
