import PokemonsList from "../Interfaces/pokemonsList";
import React, {useEffect, useState} from "react";
import Pokemon from "../Interfaces/pokemon";
import axios from "axios";
import '../Styles/showPokemon.css'

function ShowPokemon(props:PokemonsList){

    const[pokemon,setPokemon]=useState<Pokemon>({
        name:'',
        sprites:{front_default:''},
        types:[{slot:0,type:{name:''}}],
        id:0,
        stats:[{name:'',base_stat:0}]
    });
    const [loaded,setLoaded]=useState<boolean>(false);
    const [types,setTypes]=useState<string[]>(['']);
    const [filteredPokemons,setFiltered]=useState<Pokemon>({
        name:'',
        sprites:{front_default:''},
        types:[{slot:0,type:{name:''}}],
        id:0,
        stats:[{name:'',base_stat:0}]
    })

    useEffect(() => {
        axios.get(props.pokemon)
            .then(res => {
                const pokemons = res.data;
                setPokemon(pokemons);
            })
        setLoaded(true)
    },[props.filter])

    useEffect(()=>{
        setTypes(pokemon.types.map((e)=>{return (e.type.name)}))
        types.forEach((e)=> {
            if (e === props.filter) {
                setFiltered(pokemon)
            }
        })
    },[props.filter])


    return(
        <>
            {/*{loaded? types.forEach((e)=> {
                if (e === props.filter) {
                    return (
                        <div className='pokemonCard' onClick={() => props.current(pokemon)} key={pokemon.id}>
                        <img className='pokemonImage' alt={pokemon.name} src={pokemon.sprites.front_default}/>
                        <h2>{pokemon.name}</h2>
                            <div className='pokemonTypes'>
                                {pokemon.types.map((e) => {
                                return (
                                    <div key={e.slot} className='pokemonType'>{e.type.name}</div>
                                )})}
                            </div>
                        </div>
                    )}}):<></>}*/}
            {loaded? <div className='pokemonCard' onClick={() => props.current(filteredPokemons)} key={filteredPokemons.id}>
                <img className='pokemonImage' alt={filteredPokemons.name} src={filteredPokemons.sprites.front_default}/>
                <h2>{filteredPokemons.name}</h2>
                <div className='pokemonTypes'>
                    {filteredPokemons.types.map((e) => {
                        return (
                            <div key={e.slot} className='pokemonType'>{e.type.name}</div>
                        )})}
                </div>
            </div>:<></>}
        </>
    )
}

export default ShowPokemon