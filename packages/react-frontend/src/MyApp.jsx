// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

// src/MyApp.jsx

function MyApp() {
  const [characters, setCharacters] = useState([]);

  
  async function fetchUsers() {
    try{
      const response = await fetch("http://localhost:8000/users");
      const json = await response.json();
      return json.users_list;
    }
    catch(error){
      console.log(error);
      return false;
    }
  }
  
  useEffect(()=>{
    fetchUsers().then(result=>{
      if (result){
        setCharacters(result);
      }
    });
  },[]);

  
  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => { // again this is a new array "updated" we're not changing the array of characters defined as const above
      return i !== index; // if i == index that means this is the index of the row we want to delete
    });
    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]); // it's a shallow copy of the array using the spread operator ... which takes the old character array and then using "," appends the new person
  }
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />  
      
    </div>
  );
}

export default MyApp;

// Line 25: prop handleSubmit calls the updateList function 