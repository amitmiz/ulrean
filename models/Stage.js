var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

const file = {
  key: String,
  ext: String,
  name: String,
  contents: String,
  head: String,
  tail: String
}

var StageSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  title: String,
  stageType: Number,
  learn : [String],
  tests: [{ text: String, testString: String }],
  template: String,
  required: [{ link: String, raw: String, src: String }],
  files: {
    indexhtml: file,
    indexjs: file,
    indexjsx: file
  },
}, { timestamps: true });

//StageSchema.plugin(uniqueValidator, { message: 'is already taken' });

StageSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

StageSchema.methods.slugify = function () {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};


StageSchema.methods.toJSONFor = function (user) {
  return {
    _id: this._id,
    slug: this.slug,
    title: this.title,
    stageType: this.stageType,
    tests: this.tests,
    template: this.template,
    required: this.required,
    files: this.files,
    learn : this.learn,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,

  };
};

mongoose.model('Stage', StageSchema);
