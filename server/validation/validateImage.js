const Validator = require('validator');
const { isEmpty, isNil } = require('rambda');

const validateImageCreationRequestBody = (body) => {
  let errors = {};

  // Password checks
  if (isNil(body.handle) || Validator.isEmpty(body.handle)) {
    errors.handle = 'Handle field is required';
  }

  if (isNil(body.tags)) {
    errors.tags = 'Tag field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports = validateImageCreationRequestBody;