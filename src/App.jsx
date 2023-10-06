import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';


function App({ initialItems = [], initialCheck = [] }) {
  initialItems = window.localStorage.getItem('items')
    ? window.localStorage.getItem('items').split(',')
    : [];

  initialCheck = window.localStorage.getItem('check')
    ? JSON.parse(window.localStorage.getItem('check'))
    : initialCheck;
  initialCheck = Array.isArray(initialCheck) ? initialCheck : [];

  const [name, setName] = useState('');
  const [items, setItems] = useState(initialItems);
  const [check, setCheck] = useState(initialCheck);

  React.useEffect(() => {
    window.localStorage.setItem('items', items.join(',')); // Join items array before storing
  }, [items]);

  React.useEffect(() => {
    window.localStorage.setItem('check', JSON.stringify(check));
  }, [check]);

  function handleChange(event) {
    const newItem = event.target.value;
    setName(newItem);
  }

  function handleSubmit(event) {
    event.preventDefault();

    
    if (name.trim() !== '') {
      setItems([...items, [name[0].toUpperCase() + name.substring(1)]]);
      setCheck([...check, false]);
      setName('');
    }
  }

  function handleDelete(index) {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
    const updatedCheckboxes = [...check];
    updatedCheckboxes.splice(index, 1); 
    setCheck(updatedCheckboxes);
  }

  function handleCheck(index) {
    const updatedCheckboxes = [...check];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheck(updatedCheckboxes);
  }

  return (
    <div>
      <h3>You have {items.length} items</h3>
      <div id="list">
        {items.map((item, index) => (
          <p align="left" key={index}>
            {item}
            <input
              type="checkbox"
              checked={check[index]}
              onChange={() => handleCheck(index)}
            />
            <button
              type="Submit"
              className="test"
              onClick={() => handleDelete(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="submit">
        <input value={name} onChange={handleChange} id="name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
