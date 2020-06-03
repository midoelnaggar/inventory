const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
        deliveryNumber :{type: String, required: true},
        deliveryDate :{type: Date, required: true},
        deliveryItem :{type: String, required: true},
        deliveryQty :{type: Number, required: true}
},
{
    timestamps:true
})

const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;