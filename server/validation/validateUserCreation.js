const Validator = require('validator');
const { isEmpty, isNil } = require('rambda');


const validateUserCreationRequestBody = (body) => {
  let errors = {};
  
  // convert empty values to empty string in prep for Validator
  const data = Object.keys(body).reduce((acum, key) => {
    acum[key] = isEmpty(body[key]) ? '' : body[key];
    return acum;
  }, {})

  // username checks
  if (isNil(data.username) || Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  // name checks
  if (isNil(data.fname) || Validator.isEmpty(data.fname)) {
    errors.fname = 'First name field is required';
  }

  if (isNil(data.lname) || Validator.isEmpty(data.lname)) {
    errors.lname = 'Last name field is required';
  }

  // other checks
  if (isNil(data.email) || Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // Password checks
  if (isNil(data.password) || Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (isNil(data.password) || !Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must contain between 6 and 30 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports = validateUserCreationRequestBody;