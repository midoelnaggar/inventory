const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
console.log(cors());
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
 
const itemsRouter = require('./routes/items');
const receivesRouter = require('./routes/receives');
const deliveriesRouter = require('./routes/deliveries');

app.use('/items', itemsRouter);
app.use('/receives', receivesRouter);
app.use('/deliveries', deliveriesRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('inventory_fe/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'inventory_fe', 'build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    
});