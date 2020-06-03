const router = require('express').Router();
let Receive = require('../models/receive.model');

router.route('/').get((req, res) => {
  Receive.find()
    .then(receives => res.json(receives))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const receiveNumber =  Number(req.body.receiveNumber);
  const receiveDate = Date.parse(req.body.receiveDate);
  const receiveItem = req.body.receiveItem;
  const receiveQty = Number(req.body.receiveQty);

  const newReceive = new Receive({
    receiveNumber, 
    receiveDate,
    receiveItem,
    receiveQty,
  });

  newReceive.save()
  .then(() => res.json('Receive added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Receive.findById(req.params.id)
    .then(receive => res.json(receive))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Receive.findByIdAndDelete(req.params.id)
    .then(() => res.json('Receive deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Receive.findById(req.params.id)
    .then(receive => {
         receiveNumber =  Number(req.body.receiveNumber);
         receiveDate = Date.parse(req.body.receiveDate);
         receiveItem = req.body.receiveItem;
         receiveQty = Number(req.body.receiveQty);
      
      receive.save()
        .then(() => res.json('Receive updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;