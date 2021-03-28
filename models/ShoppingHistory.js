const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingHistorySchema = new Schema({
  historyMonth: {
    type: String,
    required: true,
  },
  historyYear: {
    type: String,
    required: true,
  },
  monthDetails: [
    {
      historyName: {
        type: String,
        // required: true,
      },
      historyDetails: {
        type: Array,
      },
      historyStatus: {
        type: String,
      },
      itemsTotal: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ShoppingHistory = mongoose.model(
  'shoppingHistory',
  ShoppingHistorySchema
);

// {
//   categoryName: {
//     type: String,
//     required: true,
//   },
//   historyLists: {
//     type: Array,
//   },
// },
