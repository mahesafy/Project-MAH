const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB only once per cold start
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

app.get('/api/items', async (req, res) => {
  try {
    await connectDB();
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items', details: err.message });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    await connectDB();
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item', details: err.message });
  }
});

module.exports = app;
