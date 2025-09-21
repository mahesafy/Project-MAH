# MERN Project Setup Guide

This guide will help you set up and run a basic MERN (MongoDB, Express, React, Node.js) project on Windows using PowerShell.

## Prerequisites

1. **Node.js & npm**
   - Download and install from: https://nodejs.org/
   - Verify installation:
     ```powershell
     node -v; npm -v
     ```

2. **MongoDB**
   - Download and install from: https://www.mongodb.com/try/download/community
   - After installation, start MongoDB server:
     ```powershell
     # Default installation
     "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
     ```
   - Or use MongoDB Compass for GUI.

## Project Structure

```
Project/
  backend/    # Express/Node.js API
  frontend/   # React app
```

---

## Backend Setup (Express/Node.js)

1. Open PowerShell in the `backend` folder:
   ```powershell
   cd backend
   ```
2. Initialize Node.js project:
   ```powershell
   npm init -y
   ```
3. Install dependencies:
   ```powershell
   npm install express mongoose cors
   ```
4. Create `index.js` with a basic API:
   ```js
   // ...see backend/index.js...
   ```
5. Start the backend server:
   ```powershell
   node index.js
   ```

---

## Frontend Setup (React)

1. Open a new PowerShell window in the `frontend` folder:
   ```powershell
   cd frontend
   ```
2. Create React app:
   ```powershell
   npx create-react-app .
   ```
3. Start the React app:
   ```powershell
   npm start
   ```

---

## Connecting Frontend and Backend
- The backend runs on `http://localhost:5000` by default.
- The frontend runs on `http://localhost:3000`.
- Use `fetch` or `axios` in React to call backend APIs.

---

## Example Backend API (backend/index.js)
```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', ItemSchema);

app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.json(newItem);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
```

---

## Example Frontend API Call (React)
In `frontend/src/App.js`:
```js
import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const addItem = async () => {
    const res = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input }),
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setInput('');
  };

  return (
    <div>
      <h1>MERN Demo</h1>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

---

## Summary
- Start MongoDB
- Start backend: `node backend/index.js`
- Start frontend: `npm start` in `frontend`
- Open http://localhost:3000

---

For any issues, check the terminal output for errors and ensure all dependencies are installed.