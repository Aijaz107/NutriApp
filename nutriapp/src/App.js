import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [diseaseName, setDiseaseName] = useState('');
  const [dishes, setDishes] = useState([]);

  const handleInputChange = (e) => {
    setDiseaseName(e.target.value);
  };

  const searchDishes = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${diseaseName}`
      );
      setDishes(response.data.hits.map(hit => hit.recipe));
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const displayDishes = () => {
    return dishes.map(recipe => (
      <div key={recipe.uri} className="card">
        <img src={recipe.image} alt={recipe.label} />
        <div className="card-content">
          <h3>{recipe.label}</h3>
          <p>Source: {recipe.source}</p>
          <p>
            <strong>Ingredients:</strong>
          </p>
          <ul>
            {recipe.ingredientLines.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>
            <strong>Nutritional Values:</strong>
          </p>
          <ul>
            {Object.entries(recipe.totalNutrients).map(([key, value]) => (
              <li key={key}>
                {value.label}: {value.quantity} {value.unit}
              </li>
            ))}
          </ul>
          <a href={recipe.url} target="_blank" rel="noopener noreferrer">
            View Recipe
          </a>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <h1>Restaurant dish sugestion App</h1>
      <input
        type="text"
        placeholder="Enter disease name"
        value={diseaseName}
        onChange={handleInputChange}
      />
      <button onClick={searchDishes}>Search</button>

      <div>
        <h2>Dishes for {diseaseName}</h2>
        <div className="card-container">{displayDishes()}</div>
      </div>
    </div>
  );
}

export default App;
