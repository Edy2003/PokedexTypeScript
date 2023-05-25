import currentPokemon from "../Interfaces/currentPokemon";


function ShowCurrentPokemon(props:currentPokemon){

    return(
        <div key={props.currentPokemon.id}>
            <img src={props.currentPokemon.sprites.front_default}/>
            <h1>{props.currentPokemon.name}</h1>
            <h2>#{props.currentPokemon.id}</h2>
            <div>{props.currentPokemon.stats.map((e,index)=>{
                return(
                    <div key={index}>
                        <p>{e.name}</p>
                        <p>{e.base_stat}</p>
                    </div>
                )
            })}</div>
        </div>
    )
}

export default ShowCurrentPokemon