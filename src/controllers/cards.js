const Card = require('../models/card');
const { requestError } = require('../utils/errors');
const { validUrl } = require('../utils/urlCheck');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      requestError(err, req, res);
    });
};

module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => {
      const err = new Error('no record found with provided ID');
      err.name = 'NotFound';
      return err;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      requestError(err, req, res);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  if (validUrl(link)) {
    Card.create({ name, link, owner: req.user._id })
      .then((card) => res.status(201).send({ data: card }))
      .catch((err) => {
        requestError(err, req, res);
      });
  } else {
    const err = new Error('Incorrect link URL');
    err.name = 'ValidationError';
    requestError(err, req, res);
  }
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      const err = new Error('no record found with provided ID');
      err.name = 'NotFound';
      return err;
    })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      requestError(err, req, res);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error('no record found with provided ID');
      err.name = 'NotFound';
      return err;
    })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      requestError(err, req, res);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error('no record found with provided ID');
      err.name = 'NotFound';
      return err;
    })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      requestError(err, req, res);
    });
};
