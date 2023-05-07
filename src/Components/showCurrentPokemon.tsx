import currentPokemon from "../Interfaces/currentPokemon";


function ShowCurrentPokemon(props:currentPokemon){

    return(
        <>
            <img src={props.currentPokemon.sprites.front_default}/>
            <h1>{props.currentPokemon.name}</h1>
            <h2>#{props.currentPokemon.id}</h2>
            <div>{props.currentPokemon.stats.map((e)=>{
                return(
                    <>
                        <p>{e.name}</p>
                        <p>{e.base_stat}</p>
                    </>
                )
            })}</div>
        </>
    )
}

export default ShowCurrentPokemon