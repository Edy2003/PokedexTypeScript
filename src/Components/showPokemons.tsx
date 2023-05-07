import PokemonsList from "../Interfaces/pokemonsList";
import React, {useEffect, useState} from "react";
import Pokemon from "../Interfaces/pokemon";
import axios from "axios";
import '../Styles/showPokemon.css'

function ShowPokemon(props:PokemonsList){

    const[pokemon,setPokemon]=useState<Pokemon>({
        name:'',
        sprites:{front_default:''},
        types:[{type:{name:''}}],
        id:0,
        stats:[{name:'',base_stat:0}]});

    useEffect(() => {
        axios.get(props.pokemon)
            .then(res => {
                const pokemons = res.data;
                setPokemon(pokemons);
            })
    },[])

    return(
        <div className='pokemonCard' onClick={()=>props.current(pokemon)}>
            <img className='pokemonImage' alt={pokemon.name} src={pokemon.sprites.front_default}/>
            <h2>{pokemon.name}</h2>
            <div className='pokemonTypes'>{pokemon.types.map((e) => {
                return(
                    <div className='pokemonType'>{e.type.name}</div>
                )
            })}</div>

        </div>
    )
}

export default ShowPokemon