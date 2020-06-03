const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
        itemName :{type: String, required: true},
        itemVendor :{type: String, required: false},
        itemPrice :{type: Number, required: false},
        
},
{
    timestamps:true
})

    



const Item = mongoose.model('Item', itemSchema);

   
module.exports = Item;