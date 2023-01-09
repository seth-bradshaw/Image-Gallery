const { encrypt } = require("../encryptionHelpers");
const User = require("../../models/User");
const validateUserCreationRequestBody = require("../../validation/validateUserCreation");
const { pick } = require("rambda");

const createUser = async (req, res, next) => {
  const { isValid, errors } = validateUserCreationRequestBody(req.body);

  if (!isValid) {
    res.status(400).send({
      error: {
        message: "Failed to create user. Invalid request body.",
        errors,
      },
    });
    return;
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .send("Failed to create user. Email already exists.");
    } else {
      const password = encrypt(req.body.password);
      const newUser = new User({ ...req.body, password });

      newUser
        .save()
        .then((user) => {
          res.user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            fname: user.fname,
            lname: user.lname
          };
          res.message = {
            message: "Successfully created user.",
            user: pick(
              ["_id", "username", "email", "fname", "lname", "created_at"],
              user
            ),
          };
          next();
        })
        .catch((error) => {
          res.status(400).send({
            error,
            message: "Failed to create user. Please try again.",
          });
        });
    }
  });
};

// TODO stretch endpoint
const editUser = async (req, res) => {
  res.send("edited user");
};

// TODO stretch endpoint
const deleteUser = async (req, res) => {
  res.send("deleted user");
};

module.exports = { createUser, editUser, deleteUser };
