const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateCategoryInput = (data) => {
  let errors = {};

  data.itemName = !isEmpty(data.itemName) ? data.itemName : '';
  data.categoryName = !isEmpty(data.categoryName) ? data.categoryName : '';

  if (!Validator.isLength(data.itemName, { min: 2, max: 30 })) {
    errors.itemName = 'Item name must be between 2 and 30 characaters';
  }

  if (Validator.isEmpty(data.itemName)) {
    errors.itemName = 'Item name is required';
  }

  if (!Validator.isLength(data.categoryName, { min: 2, max: 30 })) {
    errors.categoryName = 'Category name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.categoryName)) {
    errors.categoryName = ' Category name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
