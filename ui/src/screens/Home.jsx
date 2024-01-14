import Hero from "../components/Hero";
import react from "react";
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const HomePage = ()=>{
    return(
        <>
        <Nav />
            <Hero />
        <Footer />
        </>
    )
}

export default HomePage;