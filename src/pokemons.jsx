import React, { useState, useEffect } from "react";
import HealthBar from "./barDeVie";

const apiUrl = process.env.REACT_APP_API_URL;
const PokemonName = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [team, setTeam] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState({});
  const [pokemonHealth, setPokemonHealth] = useState(100);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = async () => {
    const response = await fetch(`${apiUrl}/random`);
    const data = await response.json();
    setPokemonName(data);
    setPokemonHealth(data.HP);
  };

  const addPokemonToTeam = () => {
    if (team.length < 6) {
      setTeam([...team, pokemonName[" Name"]]);
    }
  };

  const getRandomPokemon = () => {
    fetchRandomPokemon();
  };

  const changePosition = (index) => {
    const newTeam = [...team];
    const clickedPokemon = newTeam.splice(index, 1)[0];
    newTeam.unshift(clickedPokemon);
    setTeam(newTeam);
  };

  const createEnemyPokemon = async () => {
    const response = await fetch(`${apiUrl}/random`);
    const data = await response.json();
    setEnemyPokemon(data);
  };

  const renderPokemonInfo = () => (
    <div className="pokemon-info">
      <div className="pokemon-name">
        <h1>{pokemonName[" Name"]}</h1>
        <ul>
          <li>Types: {pokemonName.Types}</li>
          <li>
            <HealthBar health={pokemonHealth} />
          </li>
          <li>Attack: {pokemonName.Attack}</li>
          <li>Defense: {pokemonName.Defense}</li>
          <li>Speed: {pokemonName.Speed}</li>
        </ul>
        <button onClick={addPokemonToTeam}>Ajouter à l'équipe</button>
        <button onClick={getRandomPokemon}>Obtenir un nouveau Pokémon</button>
      </div>
    </div>
  );

  const renderTeamInfo = () => (
    <div className="team-info">
      <h2 className="team">Equipe</h2>
      <h3>{team.length}/6</h3>
      <h4>{team[0]}</h4>
      <ul>
        {team.map((pokemon, index) => (
          <li key={index}>
            <button onClick={() => changePosition(index)}>
              {index + 1}.{pokemon}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setTeam([])}>Vider l'équipe</button>
    </div>
  );

  const renderEnemyInfo = () => (
    <div>
      <h2>Ennemi</h2>
      <ul>
        <li>Nom: {enemyPokemon[" Name"]}</li>
        <li>Types: {enemyPokemon.Types}</li>
        <li>HP: {enemyPokemon.HP}</li>
        <li>Attack: {enemyPokemon.Attack}</li>
        <li>Defense: {enemyPokemon.Defense}</li>
      </ul>
      <button onClick={createEnemyPokemon}>Creer un nouvel ennemi</button>
    </div>
  );

  return (
    <div className="pokemon">
      {renderPokemonInfo()}
      {renderTeamInfo()}
      {renderEnemyInfo()}
    </div>
  );
};

export default PokemonName;
