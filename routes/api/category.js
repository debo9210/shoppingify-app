const express = require('express');
const router = express.Router();

// load category model
const Category = require('../../models/Category');

//load validation
const validateCategoryInput = require('../../validation/categoryValidation');

// @Route Get api/category
// @Desc get all category
// @Access Public
router.get('/', (req, res) => {
  Category.find()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => res.status(404).json({ msg: 'No categories found' }));
});

// @Route Post api/category
// @Desc create category and items in db
// @Access Public
router.post('/', (req, res) => {
  //   console.log(req.body);
  const { errors, isValid } = validateCategoryInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  Category.findOne({ categoryName: req.body.categoryName })
    .then((category) => {
      if (!category) {
        const newCategory = new Category({
          categoryName: req.body.categoryName,
        });

        const newItem = {
          itemNote: req.body.itemNote,
          itemImage: req.body.itemImage,
          itemName: req.body.itemName,
        };
        newCategory.itemDetails.push(newItem);

        newCategory.save().then((category) => res.json(category));
      } else {
        const newItem = {
          itemNote: req.body.itemNote,
          itemImage: req.body.itemImage,
          itemName: req.body.itemName,
        };

        Category.findOneAndUpdate(
          { categoryName: req.body.categoryName },
          { $push: { itemDetails: newItem } }
        ).then((category) => res.json(category));
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
