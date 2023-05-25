interface Pokemon{
    name:string;
    sprites: {
        front_default:string;
    };
    types:[{slot:number, type:{ name:string}}];
    id:number;
    stats:[stat:{name:string,base_stat:number}]
}
export default Pokemon