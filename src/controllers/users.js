const User = require('../models/user');
const { requestError } = require('../utils/errors');
const { validUrl } = require('../utils/urlCheck');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      requestError(err, req, res);
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const err = new Error('no record found with provided ID');
      err.name = 'NotFound';
      return err;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      requestError(err, req, res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  if (validUrl(avatar)) {
    User.create({ name, about, avatar })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => {
        requestError(err, req, res);
      });
  } else {
    const err = new Error('Incorrect avatar URL');
    err.name = 'CastError';
    requestError(err, req, res);
  }
};

module.exports.updateUser = (req, res) => {
  const patchableProperties = ['name', 'about'];
  const missingProp = patchableProperties.find((field) => req.body[field].length < 1);

  if (missingProp) {
    const err = new Error('Missing required field in profile update form');
    err.name = 'ValidationError';
    requestError(err, req, res);
  } else {
    const { name, about } = req.body;
    const newObj = { name, about };

    User.findByIdAndUpdate(req.user._id, newObj, { new: true, runValidators: true })
      .orFail(() => {
        const err = new Error('no record found with provided ID');
        err.name = 'NotFound';
        return err;
      })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => {
        requestError(err, req, res);
      });
  }
};

module.exports.updateUserAvatar = (req, res) => {
  const patchableProperties = ['avatar'];
  const missingProp = patchableProperties.find((field) => req.body[field].length < 1);

  if (missingProp) {
    const err = new Error('Missing required field in avatar update form');
    err.name = 'ValidationError';
    requestError(err, req, res);
  } else {
    const { avatar } = req.body;

    if (validUrl(avatar)) {
      const newObj = { avatar };

      User.findByIdAndUpdate(req.user._id, newObj, { new: true, runValidators: true })
        .orFail(() => {
          const err = new Error('no record found with provided ID');
          err.name = 'NotFound';
          return err;
        })
        .then((user) => res.status(201).send({ data: user }))
        .catch((err) => {
          requestError(err, req, res);
        });
    } else {
      const err = new Error('Incorrect avatar URL');
      err.name = 'ValidationError';
      requestError(err, req, res);
    }
  }
};
