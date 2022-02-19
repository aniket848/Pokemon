import React from "react";
import styles from "./PokemonDetail.module.css";

const PokemonDetail = (props)=>{
    return(
        <div className={styles.PokemonDetail}>
            <div className={styles.imagebox}>
               <img  className={styles.image} src={props.image} alt={props.name}/>
            </div>  
            <h2 className={styles.name}>{props.name}</h2>
            <h3 className={styles.weapon}>{props.weapon}</h3>
        </div>
    );
}

export default PokemonDetail;