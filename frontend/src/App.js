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