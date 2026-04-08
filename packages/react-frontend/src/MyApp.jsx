// src/MyApp.jsx
import React from "react";
import { useState } from "react";
import Table from "./Table";
import Form from "./Form";

// src/MyApp.jsx

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index; // if i == index that means this is the index of the row we want to delete
    });
    setCharacters(updated);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter ={removeOneCharacter}/>
      <Form />
    </div>
    
  );

  
}

export default MyApp;
