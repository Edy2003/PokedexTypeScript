import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

import PokemonsUrlList from "./Interfaces/pokemonsUrlList";

import ShowPokemon from "./Components/showPokemons";
import ShowCurrentPokemon from "./Components/showCurrentPokemon";
import Pokemon from "./Interfaces/pokemon";


function App() {
  const [pokemonsUrlList,setPokemonsUrlList]=useState<string[]>(['']);
  const [arrPokemon,setArrPokemon]=useState<string[]>(['']);
  const [loaded,setLoaded]=useState<boolean>(false);
  const [visibility,setVisibility]=useState<boolean>(false);
    const [pokemon,setPokemon]=useState<Pokemon>({
        name:'',
        sprites:{front_default:''},
        types:[{slot:0,type:{name:''}}],
        id:0,
        stats:[{name:'',base_stat:0}]
    });
  const [currentPokemon,setCurrentPokemon]=useState<Pokemon>({
      name:'',
      sprites:{front_default:''},
      types:[{slot:0,type:{name:''}}],
      id:0,
      stats:[{name:'',base_stat:0}]
  });
  const[first,setFirst]=useState<number>(0);
  const[second,setSecond]=useState<number>(9);

  const [filter,setFilter]=useState<string>('');

  useEffect (()=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=27`)
        .then(res => {
          const pokemons:PokemonsUrlList = res.data;
          setPokemonsUrlList(pokemons.results.map((e)=>e.url));
          setArrPokemon(pokemons.results.map((e)=>e.url).slice(first,second))
          setLoaded(true);
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

    useEffect(()=>{

    },[filter])

    const filterPokemons = (i:Pokemon) =>{
        const types = (pokemon.types.map((e)=>{return e.type.name}));
        types.forEach((e)=> {
            if (e === filter) {
                console.log (pokemon)
            }
        })
    }
  return (
      <>
          <div className="filter">
              <button onClick={()=>setFilter('fire')}>Fire</button>
              <button onClick={()=>setFilter('grass')}>Grass</button>
              <button onClick={()=>setFilter('poison')}>Poison</button>
          </div>
          <div className='container'>

              <div className='pokemonsList'>

                  {loaded? arrPokemon.map((e,index) =>
                      <ShowPokemon key={index} pokemon={e}
                                   current={showCurrentPokemon}
                                   filter={filterPokemons}
                                   index={index}
                      />
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
