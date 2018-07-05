const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articlesSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  content: String,
  pic: {
		type: String,
		default: 'https://jnaengineering.co.za/images/no_product.png'
	},
  category: String,
  comments: [{
    comments: String
  }]
}, {
  timestamps: true
});

articlesSchema.pre('update', function () {
  this.updated_at({}, {
    $set: {
      updated_at: new Date()
    }
  })
})

module.exports = mongoose.model('Article', articlesSchema);
