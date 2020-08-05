import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(getRepositories, []);

  async function handleAddRepository() {
    const payload = {
      url: `https://github.com/Jemesson`,
      title: `ReactJS bootcamp challenge_${Date.now()}`,
      techs: ["React", "Node.js"],
    }
    const response = await api.post('repositories', payload);
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filteredRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(filteredRepositories);
  }

  function getRepositories() {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
