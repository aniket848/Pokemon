import React,{useEffect,useState} from "react";
import PokemonDetail from "./PokemonDeatil";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styles from "./Pokemon.module.css";


const Pokemon=()=>{

    const animatedComponents = makeAnimated();
    const [PokemonList,setPokemonList]=useState([]);
    const [PokemonName,setPokemonName]=useState([]);
    const [NameFilter,setNameFilter]=useState([]);
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=60"; 


    const getAllPokemon = async()=>{

          const res = await fetch(URL);
          const data = await res.json();
         
          

          const getPokemonArray = (pokemons)=>{
              
              pokemons.forEach(async singlePokemon =>{
                   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${singlePokemon.name}`);
                   const data = await res.json();
                   setPokemonList(prevList =>[...prevList,data]);
                   setPokemonName(prevName => [...prevName,{label:data.name , value:data.name}]);
              });
          }

          getPokemonArray(data.results);
    }

    

    const changeHandler=(event)=>{
        
        setNameFilter([]);
        event.forEach(x=>{
            setNameFilter(prev=> [...prev,x.value]);
        });
    }

     useEffect(()=>{
       async function call(){
           await getAllPokemon();
       }  
       call();
     },[])

    return(
        <React.Fragment>
          <h1 className={styles.heading}>POKEMON</h1>
            <Select  className={styles.input}
                options={PokemonName}
                placeholder="Search any Pokemon"
                isSearchable
                onChange={changeHandler}
                components={animatedComponents}
                closeMenuOnSelect={false}
                isMulti
                noOptionsMessage={()=> "No other Pokemon :("}
            />
         <div className={styles.mainPage}>
          
          {PokemonList.map((pokemon,index) =>{
              if(NameFilter.length===0 || NameFilter.includes(pokemon.name)){
              return(
                 <PokemonDetail 
                   name={pokemon.name}
                   image={pokemon.sprites.other.dream_world.front_default}
                   weapon={pokemon.types[0].type.name}
                   key={index}
                 />
              );
              }
          })}
      </div>
      </React.Fragment>
    );
}

export default Pokemon;