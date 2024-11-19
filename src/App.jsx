import React, { useState } from "react";
import { useFetch } from "./useFetch";
import useDebounce from "./useDebounce"; 
import "./index.css";

function App() {
  const [query, setQuery] = useState("1"); 
  const debouncedQuery = useDebounce(query, 500); 
  const { data, loading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${debouncedQuery}`);

  return (
    <div className="App">
      <h1>Buscar por nombre o ID</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())} 
        />
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {data && (
        <div>
          <h1>{data.name.toUpperCase()}</h1>
          <img src={data.sprites.front_default} alt={data.name} />
          <div>
            <h2>Types:</h2>
            {data.types.map((type) => (
              <span key={type.type.name}>{type.type.name}</span>
            ))}
            <h2>Abilities:</h2>
            {data.abilities.map((ability) => (
              <span key={ability.ability.name}>{ability.ability.name}</span>
            ))}
            <h2>Base Stats:</h2>
            {data.stats.map((stat) => (
              <div key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
