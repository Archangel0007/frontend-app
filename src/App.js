import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validate JSON input
      const parsedInput = JSON.parse(input);
      const { data } = parsedInput;

      // Call the backend API
      const res = await axios.post('https://glowing-mousse-2cc5f5.netlify.app/.netlify/functions/bfhl', {
        status: 'active',
        user_id: 'user123',
        college_email: 'user@example.com',
        college_roll_number: '21BCE1351',
        numbers: data.filter(item => !isNaN(item)).map(Number),
        alphabets: data.filter(item => isNaN(item))
      });

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON input');
      setResponse(null);
    }
  };

  const handleDropdownChange = (event) => {
    const { options } = event.target;
    const selectedValues = Array.from(options).filter(option => option.selected).map(option => option.value);
    setSelectedOptions(selectedValues);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    let output = {};

    if (selectedOptions.includes('Numbers')) output.numbers = numbers;
    if (selectedOptions.includes('Alphabets')) output.alphabets = alphabets;
    if (selectedOptions.includes('Highest lowercase alphabet')) output.highest_lowercase_alphabet = highest_lowercase_alphabet;

    return (
      <pre>{JSON.stringify(output, null, 2)}</pre>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>21BCE1351</h1> {/* Replace CS101 with your roll number */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter JSON data, e.g., {"data": ["A", "C", "z"]}'
            rows="10"
            cols="50"
          />
          <br />
          <button type="submit">Submit</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {response && (
          <>
            <label>
              Select Options:
              <select multiple onChange={handleDropdownChange}>
                <option value="Alphabets">Alphabets</option>
                <option value="Numbers">Numbers</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
              </select>
            </label>
            <div>
              {renderResponse()}
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
