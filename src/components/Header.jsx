import Classes from "../styles/Header.module.css"

import {BiHelpCircle} from "react-icons/bi"
import { MdAccountCircle } from "react-icons/md"
import { AiFillPlusCircle } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"
import { GiHamburgerMenu } from "react-icons/gi"

function showNav(){
    let toggleButtons = document.getElementsByClassName(Classes.toggleButton);
    toggleButtons[0].classList.toggle("inactive");
    toggleButtons[1].classList.toggle("inactive");
    let Nav = document.getElementsByClassName(Classes.Nav);
    Nav[0].classList.toggle(Classes.aside)
}

function Header(){
    let x = 9;
    return (
        <header className={Classes.Header}>
            <span className={Classes.Logo}>VOYAGE HUB</span>
            <div style={{flex:1}}></div>
            <nav className={Classes.Nav} > 
                <button className={Classes.Button}>
                    <BiHelpCircle className={Classes.icon} />
                    Aide
                </button>
                <button className={Classes.Button}>
                    <AiFillPlusCircle className={Classes.icon} />
                    Publier annonce
                </button>
                <button className={Classes.Button}>
                    <MdAccountCircle className={Classes.icon} />
                    Connexion
                </button>
            </nav>
            <div onClick={showNav}>
                <GiHamburgerMenu className={Classes.toggleButton} />
                <RxCross2 className={Classes.toggleButton+" inactive"} style={{color : "rgb(255,255,255,0.9)"}}/>
            </div>
        </header>
    )
}

export default Header;