const router = require('express').Router();
let Delivery = require('../models/delivery.model');

router.route('/').get((req, res) => {
  Delivery.find()
    .then(deliveris => res.json(deliveris))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const deliveryNumber =  Number(req.body.deliveryNumber);
  const deliveryDate = Date.parse(req.body.deliveryDate);
  const deliveryItem = req.body.deliveryItem;
  const deliveryQty = Number(req.body.deliveryQty);

  const newDelivery = new Delivery({
    deliveryNumber,
    deliveryDate,
    deliveryItem,
    deliveryQty,
  });

  newDelivery.save()
  .then(() => res.json('Delivery added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Delivery.findById(req.params.id)
    .then(delivery => res.json(delivery))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Delivery.findByIdAndDelete(req.params.id)
    .then(() => res.json('Delivery deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Delivery.findById(req.params.id)
    .then(delivery => {
         deliveryNumber =  Number(req.body.deliveryNumber);
         deliveryDate = Date.parse(req.body.deliveryDate);
         deliveryItem = req.body.deliveryItem;
         deliveryQty = Number(req.body.deliveryQty);
      
      delivery.save()
        .then(() => res.json('Delivery updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;