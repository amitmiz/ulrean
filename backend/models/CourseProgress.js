var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var CourseProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stagesCompleted : Number,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  date: Date,
  completed: Boolean,

}, { timestamps: true });

CourseProgressSchema.plugin(uniqueValidator, { message: 'is already taken' });

// CourseProgressSchema.pre('validate', function(next){
//   if(!this.slug)  {
//     this.slugify();
//   }

//   next();
// });

// CourseProgressSchema.methods.slugify = function() {
//   this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
// };


// QuestionSchema.methods.toJSONFor = function(user){
//   return {
//     slug: this.slug,
//     title: this.title,
//     description: this.description,
//     body: this.body,
//     createdAt: this.createdAt,
//     updatedAt: this.updatedAt,
//     tagList: this.tagList,
//     favorited: user ? user.isFavorite(this._id) : false,
//     favoritesCount: this.favoritesCount,
//     author: this.author.toProfileJSONFor(user)
//   };
// };

mongoose.model('CourseProgress', CourseProgressSchema);
