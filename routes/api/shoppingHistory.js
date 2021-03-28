const express = require('express');
const router = express.Router();
const moment = require('moment');
const { set } = require('mongoose');

//load shopping history model
const ShoppingHistory = require('../../models/ShoppingHistory');

//valiation
const validateShoppingHistoryInput = require('../../validation/shoppingHistoryValidation');

// @Route Get /api/shoppingHistory
// @Desc get shopping history
// @Access Public
router.get('/', (req, res) => {
  ShoppingHistory.find()
    .then((history) => {
      return res.json(history);
    })
    .catch((err) => res.status(404).json({ msg: 'No shopping history found' }));
});

// @Route Post /api/shoppingHistory
// @Desc save shopping history
// @Access Public
router.post('/', (req, res) => {
  // console.log(req.body);
  const { errors, isValid } = validateShoppingHistoryInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  const date = new Date();
  const currentMonth = moment(date).format('MMMM YYYY');

  ShoppingHistory.findOne({ historyMonth: currentMonth })
    .then((historyMonth) => {
      if (!historyMonth) {
        const currMonth = new ShoppingHistory({
          historyMonth: moment(date).format('MMMM YYYY'),
          historyYear: moment(date).format('YYYY'),
          // historyMonth: 'June 2021',
          // historyYear: '2021',
        });

        const newHistory = {
          historyName: req.body.historyName,
          historyDetails: req.body.historyDetails,
          historyStatus: null,
          itemsTotal: req.body.itemsTotal,
        };

        currMonth.monthDetails.unshift(newHistory);

        currMonth.save().then((history) => res.json(history));
      } else {
        for (let i = 0; i < historyMonth.monthDetails.length; i++) {
          if (
            historyMonth.monthDetails[i].historyName === req.body.historyName
          ) {
            return res.status(400).json({ historyName: 'Name already exists' });
          }
        }

        const newHistory = {
          historyName: req.body.historyName,
          historyDetails: req.body.historyDetails,
          historyStatus: null,
          itemsTotal: req.body.itemsTotal,
        };

        ShoppingHistory.findOneAndUpdate(
          { historyMonth: moment(date).format('MMMM YYYY') },
          { $push: { monthDetails: newHistory } }
        ).then((history) => res.json(history));
      }
    })
    .catch((err) => console.log(err));
});

// @Route Post /api/shoppingHistory/update-status'
// @Desc update shopping history to complete or cancelled
// @Access Public
router.post('/update-status/:status/:id/:listName', (req, res) => {
  // console.log(req.params.id, req.params.listName, req.params.status);

  ShoppingHistory.findById(req.params.id)
    .then((history) => {
      for (let i = 0; i < history.monthDetails.length; i++) {
        if (history.monthDetails[i].historyName === req.params.listName) {
          history.monthDetails[i].historyStatus = req.params.status;
        }
      }
      history.save().then((x) => res.json(x));
    })
    .catch((err) => console.log(err));

  // ShoppingHistory.findOneAndUpdate(
  //   { _id: req.params.id },
  //   { historyStatus: req.params.status },
  //   { new: true }
  // )
  //   .then((history) => res.json(history))
  //   .catch((err) => console.log(err));
});

module.exports = router;
