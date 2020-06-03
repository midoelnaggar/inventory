const router = require('express').Router();
const Item = require('../models/item.model');



router.route('/').get((req, res) => {
  Item.aggregate([{
    $lookup: {
        from: 'recieve',
        localField: 'itemName',
        foreignField: 'receiveItem',
        as: 'itemReceives',
  
    }
  
  }, {
    $addFields: {
        itemQty: {
            $sum: "$itemReceives.receiveQty"
        }
    }
  }, {
    $out: 'items'
  }]).exec();
  Item.find()
    .then((items => res.json(items)))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const itemName = req.body.itemName;
  const itemQty = Number(req.body.itemQty);
  const itemVendor = req.body.itemVendor;
  const itemPrice = Number(req.body.itemPrice);

  const newItem = new Item({
    itemName,
    itemQty,
    itemVendor,
    itemPrice,
  });

  newItem.save()
  .then(() => res.json('Item added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Item.findById(req.params.id)
    .then(item => {
         item.itemName = req.body.itemName;
         item.itemQty = Number(req.body.itemQty);
         item.itemVendor = req.body.itemVendor;
         item.itemPrice = Number(req.body.itemPrice);

      item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
const agg1 = Item.aggregate([{
  $lookup: {
      from: 'recieve',
      localField: 'itemName',
      foreignField: 'receiveItem',
      as: 'itemReceives',

  }

}, {
  $addFields: {
      itemQty: {
          $sum: "$itemReceives.receiveQty"
      }
  }
}, {
  $out: 'items'
}]);


module.exports = router;