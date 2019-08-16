var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var QuestionSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  header: String,

  content: String,
  favoritesCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

//QuestionSchema.plugin(uniqueValidator, {message: 'is already taken'});

QuestionSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

QuestionSchema.methods.slugify = function () {
  this.slug = slug(this.header) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};


QuestionSchema.methods.toJSONFor = function () {
  return {
    _id: this._id,
    slug: this.slug,
    header: this.header,
    content: this.content,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tags: this.tags,
    author: this.author.toJSON(),
    comments: this.comments
  };
};

mongoose.model('Question', QuestionSchema);
