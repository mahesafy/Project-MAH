import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/items')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch items');
        return res.json();
      })
      .then(data => setItems(data))
      .catch(err => setError(err.message));
  }, []);

  const addItem = async () => {
    setError('');
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input }),
      });
      if (!res.ok) throw new Error('Failed to add item');
      const newItem = await res.json();
      setItems([...items, newItem]);
      setInput('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>MERN Demo</h1>
      <div style={{ marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add item..."
          style={{ padding: 8, width: '70%' }}
        />
        <button onClick={addItem} style={{ padding: 8, marginLeft: 8 }}>Add</button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;