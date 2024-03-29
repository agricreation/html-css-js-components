import React, { useEffect } from 'react';
import Button from "./Button";
import Community from './Community';
import Contributer from './Contributer';
import Heading from './Heading';
// import PopularPosts from './PopularPosts';
import ScroolAnimation, { ScrollAnimationForImage } from './Scrool';
import SeachBar from './Search';
import TypingTextEffect from './TypingText';
import ComponentsCard from '../components/ComponentsCard';
import { Link } from 'react-router-dom';


function Hero() {
    useEffect(() => {
        const lists = document.querySelectorAll("#scrool_list");
        lists.forEach(list => {
            const listContent = Array.from(list.children);
            listContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);   
                list.appendChild(duplicatedItem);
            });
        });
    }, []);

    return (
        <>
            <section>
                <div className="hero_section text-center">
                    <h3 className="fw-bold lh-base">Open Source Awesome Ui-Componenets <br /> for your next projects</h3>
                </div>
                <div className="hero_info text-center my-3 fw-bolder ">
                    {/* <p>Save and share your creative designes to open source</p> */}
                    <TypingTextEffect text="Save and share your creative designes to open source" delay={100} />
                </div>
                <div className="hero_search">
                    <SeachBar />
                    <ScroolAnimation />
                    <ScrollAnimationForImage direction={"Right"} />
                    <div className="shadow_fade">
                        <ScrollAnimationForImage direction={"Left"} />
                    </div>
                    <div className="align_button mt-2 ">
                        <Link to={`/${"all"}`} >
                                <Button icon={"logo"} text={"Explore More Componenets"} />
                        </Link>
                    </div>
                </div>
            </section>

            <section>
                <Heading main={"Popular Components"} sub={"trending"} />
            </section>
            <section>
                <div className="container">
                    <ComponentsCard catogreise={"buttons"} componentType="all" onlyCard={true} />
                </div>             
            </section>
            <section>
                <Heading main={"Our Polular Contributer"} sub={"Signup to contribute"} />
            </section>
            <section>
                <Contributer />
            </section>
            <section>
                <Community />
            </section>
        </>
    )
}

export default Hero;