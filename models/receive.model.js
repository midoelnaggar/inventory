const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const receiveSchema = new Schema({
        receiveNumber :{type: String, required: true},
        receiveDate :{type: Date, required: true},
        receiveItem :{type: String, required: true},
        receiveQty :{type: Number, required: true}
},
{
    timestamps:true
})

const Receive = mongoose.model('receive', receiveSchema);
module.exports = Receive;