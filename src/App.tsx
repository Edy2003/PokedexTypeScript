import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

import PokemonsUrlList from "./Interfaces/pokemonsUrlList";

import ShowPokemon from "./Components/showPokemons";
import ShowCurrentPokemon from "./Components/showCurrentPokemon";
import Pokemon from "./Interfaces/pokemon";
import CurrentPokemon from "./Interfaces/currentPokemon";

function App() {
  const [pokemonsUrlList,setPokemonsUrlList]=useState<string[]>(['']);
  const [loaded,setLoded]=useState<boolean>(false);
  const [visibility,setVisibility]=useState<boolean>(false)
  const [currentPokemon,setCurrentPokemon]=useState<Pokemon>({
      name:'',
      sprites:{front_default:''},
      types:[{type:{name:''}}],
      id:0,
      stats:[{name:'',base_stat:0}]});

  useEffect (()=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=9`)
        .then(res => {
          const pokemons:PokemonsUrlList = res.data;
          setPokemonsUrlList(pokemons.results.map((e)=>e.url));
          setLoded(true);
        })
  },[]);

  const showCurrentPokemon = (i:Pokemon) =>{
      setVisibility(true);
      setCurrentPokemon(i);
  }


  return (
        <div className='container'>
            <div className='pokemonsList'>
                {loaded? pokemonsUrlList.map((e) =>
                    <ShowPokemon pokemon={e}
                                 current={showCurrentPokemon}/>
                ):<></>}
            </div>
            <div className={ visibility? 'active':'disabled' }>
                <ShowCurrentPokemon currentPokemon={currentPokemon}/>
            </div>
        </div>
  );
}

export default App;
