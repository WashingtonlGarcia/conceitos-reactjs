import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setState ] = useState([]);
  useEffect(() => {
    api.get("repositories").then((res) => {  
      setState(res.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Desafio ReactJS",
      url: "https://github.com/josepholiveira",    
      techs: ["React", "Node.js"],
    });
    setState([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setState(repositories.filter(repository=>repository.id!==id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((e)=>{
          return (          
          <li key={e.id}>
          {e.title}
          <button onClick={() => handleRemoveRepository(e.id)}>Remover</button>
        </li>
        )
        })}       
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
