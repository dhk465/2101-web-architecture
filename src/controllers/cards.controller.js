//
// CONTROLS DB ACTIONS FOR CARDS
//

const Card = require('../models/cards.model')
const mongoose = require('mongoose')

// create a new card
exports.insert = async (req, res) => {
  try {
    const card = new Card(req.body)
    const cardSaved = await card.save()
    res.status(201).json({
      ok: true,
      card: cardSaved._id
    });
  } catch (error) {
    console.log(error);
  }
}

// find and show the user's cards in the database
exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  const oId = mongoose.Types.ObjectId(req.query.user)
  Card.find({ user: oId, status: req.query.status })
        .limit(limit)
        .skip(limit * page)
        .exec( (err, cardDB) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err: 'bad request'
            });
          }
          res.status(200).json({
            ok: true,
            cards: cardDB
          });
        })
}

// find a card using id
exports.getById = (req, res) => {
  Card.findById({ _id: req.params.cardId }, (err, cardDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: 'bad request'
      });
    } else if (!cardDB) {
      return res.status(404).json({
        ok: false,
        err: "Card does not exist"
      });
    } else {
      res.status(200).json({
        ok: true,
        user: cardDB
      });
    }
  })
}

// update a card found using id
exports.patchById = (req, res) => {
  Card.findOneAndUpdate({_id: req.params.cardId }, req.body, { useFindAndModify: false }, (err, cardUpdated) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: 'bad request'
      });
    }else if (!cardUpdated) {
      return res.status(404).json({
        ok: false,
        err: 'Card not found or already deleted'
      });
    } else {
      res.status(200).json({
        ok: true,
        card: cardUpdated
      });
    }
  })

}

// disable card using id
exports.disableById = (req, res) => {
  let status = {
    status: false
  }
  Card.findByIdAndUpdate(req.params.cardId, status, (err, cardDisabled) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: 'bad request'
      });
    } else if (!cardDisabled) {
      return res.status(404).json({
        ok: false,
        err: 'Card not found or already deleted'
      });
    } else {
      res.status(200).json({
        ok: true,
        card: {
          id: cardDisabled._id,
          message: 'Card disabled'
        }
      });
    }
  })
}

// delete a card using id
exports.deleteById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId, (err, cardDeleted) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: 'bad request'
      });
    } else if (!cardDeleted) {
      return res.status(404).json({
        ok: false,
        err: 'Card not found or already deleted'
      });
    } else {
      res.status(200).json({
        ok: true,
        card: 'Card succesfully deleted'
      });
    }
  })
}
