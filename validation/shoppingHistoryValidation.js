const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateShoppingHistoryInput = (data) => {
  let errors = {};

  data.historyName = !isEmpty(data.historyName) ? data.historyName : '';

  if (!Validator.isLength(data.historyName, { min: 2, max: 30 })) {
    errors.historyName = 'Name must be between 2 and 30 characaters';
  }

  if (Validator.isEmpty(data.historyName)) {
    errors.historyName = 'Name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
