import Header from "../components/Header";
import SearchFormHome from "../components/SearchFormHome";
import Classes from "../styles/Home.module.css"

const Home = ( ) => 
{
    return (
        <div>
            <Header />
            <main>
                <section className={Classes.Section}>
                <h1 className={Classes.h1Center}>Immeubles au meilleur prix !</h1>
                <SearchFormHome />
                </section>
            </main>
        </div>
    )
}

export default Home;