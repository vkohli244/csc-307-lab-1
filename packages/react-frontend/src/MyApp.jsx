// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

// src/MyApp.jsx
function MyApp() {
  const [characters, setCharacters] = useState([]);

  function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}
  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:8000/users");
      const json = await response.json();
      return json.users_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchUsers().then((result) => {
      if (result) {
        setCharacters(result);
      }
    });
  }, []);
  
  function removeOneCharacter(id) {
  console.log("Attempting to delete ID:", id); // <--- Add this!
  fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE"
  })
    .then((response) => {
      if (response.status === 204) {
        const updated = characters.filter((character) => {
          return character.id !== id;
        });
        setCharacters(updated);
      } else if (response.status === 404) {
        console.log("Nothing deleted on backend.");
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
  function updateList(person) {
    postUser(person)
      .then((response)=>{
        if (response.status===201){
          return response.json();
        } else{
          throw new Error("Failed to create user. Status " + response.status);
        }
      })
      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log(error);
      });
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
