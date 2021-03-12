const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  itemDetails: [
    {
      itemName: {
        type: String,
        // required: true,
      },
      itemNote: {
        type: String,
      },
      itemImage: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  // itemName: {
  //   type: Array,
  //   required: true,
  // },
  // itemNote: {
  //   type: String,
  // },
  // itemImage: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Category = mongoose.model('category', CategorySchema);
