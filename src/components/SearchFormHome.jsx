import data from "../Data/villes.json"
import inputWithLabel from "./InputWithLabel";
import Button from "../components/Button.jsx"
import { useState } from "react";
import Classes from "../styles/SearchForm.module.css"

const SearchFormHome = () => {
    function Submit(){

    }

    const Villes = data.map((data) => data.ville);

    const [Type , setType] = useState("");
    const [MinPrix , setMinPrix] = useState("");
    const [MaxPrix , setMaxPrix] = useState("");
    const [Ville , setVille] = useState("");

    const inputs = [
        {id:"Type" , innerHTML:"Type" , value:Type , type:"text" , name:"Type" , datalist:["Rent","Buy"] , onChange : setType},
        {id:"MinPrix" , innerHTML:"Min Prix" , value:MinPrix , type:"number" , name:"MinPrix" , datalist:undefined , onChange: setMinPrix},
        {id:"MaxPrix" , innerHTML:"Max Prix" , value:MaxPrix , type:"number" , name:"MaxPrix" , datalist:undefined , onChange: setMaxPrix},
        {id:"Ville" , innerHTML:"Ville" , value:Ville , type:"text" , name:"Ville" , datalist:Villes , onChange: setVille}
    ];

    return (
        <form method="get" className={Classes.form} onSubmit={(e) => {e.preventDefault()}}>
            <div className={Classes.div}>
                {inputWithLabel(inputs[0])}
                {inputWithLabel(inputs[1])}
            </div>
            <div className={Classes.div}>
                {inputWithLabel(inputs[2])}
                {inputWithLabel(inputs[3])}
            </div>
            <div className={Classes.Block}>
                <Button innerHTML="Rechercher" Click={Submit} className={Classes.Button}/>
            </div>
        </form>
    );
}

export default SearchFormHome ; 