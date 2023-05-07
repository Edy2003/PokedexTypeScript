import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

import PokemonsUrlList from "./Interfaces/pokemonsUrlList";

import ShowPokemon from "./Components/showPokemons";
import ShowCurrentPokemon from "./Components/showCurrentPokemon";
import Pokemon from "./Interfaces/pokemon";


function App() {
  const [pokemonsUrlList,setPokemonsUrlList]=useState<string[]>(['']);
  const [arrPokemon,setArrPokemon]=useState<string[]>([''])
  const [loaded,setLoded]=useState<boolean>(false);
  const [visibility,setVisibility]=useState<boolean>(false)
  const [currentPokemon,setCurrentPokemon]=useState<Pokemon>({
      name:'',
      sprites:{front_default:''},
      types:[{type:{name:''}}],
      id:0,
      stats:[{name:'',base_stat:0}]});

  const[first,setFirst]=useState<number>(0);
  const[second,setSecond]=useState<number>(9);


  useEffect (()=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=27`)
        .then(res => {
          const pokemons:PokemonsUrlList = res.data;
          setPokemonsUrlList(pokemons.results.map((e)=>e.url));
          setArrPokemon(pokemons.results.map((e)=>e.url).slice(first,second))
          setLoded(true);
        })
  },[arrPokemon]);

    const loadNext=()=>{
        setFirst(first+9)
        setSecond(second+9)
        setArrPokemon(pokemonsUrlList.slice(first,second))
    }

    const loadPrev=()=>{
        setFirst(first-9)
        setSecond(second-9)
        setArrPokemon(pokemonsUrlList.slice(first,second))
    }


  const showCurrentPokemon = (i:Pokemon) =>{
      setVisibility(true);
      setCurrentPokemon(i);
  }


  return (
      <>
          <div className='container'>
              <div className='pokemonsList'>
                  {loaded? arrPokemon.map((e) =>

                      <ShowPokemon pokemon={e}
                                   current={showCurrentPokemon}/>
                  ):<></>}
                  <div className='loadButtons'>
                      <button className='navButton' disabled={first===18} onClick={loadNext}>Next</button>
                      <button className='navButton' disabled={first===0} onClick={loadPrev}>Previous</button>
                  </div>
              </div>
              <div className={ visibility? 'active':'disabled' }>
                  <ShowCurrentPokemon currentPokemon={currentPokemon}/>
              </div>
          </div>

      </>

  )
}

export default App;
