import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( ()=> {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository(){
    const response = await api.post('repositories',{
      title: `Novo projeto ${Date.now()}`,
      url: 'novoprojeto',
      techs: [
        "php",
        "JavaScript"
      ]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    const aux = repositories.find(repo => repo.id === id);
    setRepositories(repositories.filter(a => a !== aux));

  }

  return (
    <>
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
    </>
  );
}

export default App;
