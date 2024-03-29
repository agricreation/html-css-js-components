import react from "react";
import { Images } from '../konst/Images';

const Footer = () => {
    return (
        <>
            <div className="d-flex justify-content-center footer">
                <div className="container row row-cols-1 row-cols-md-2 row-cols-xl-3 my-3">
                    <FootContentCol4 />
                    <FootContentCol2 />
                    <FootContentCol1 />
                </div>
            </div>
        </>
    )
}


const FootContentCol1 = () => {
    return (
        <div className="col">
            <div className="card m-2 footer radius-10" id="footer">
                <div className="mb-3">
                    <span className="h4">About Us</span>
                </div>
                <div className="">
                    <div><a className="navbar-brand fw-bold text-light" href="#">Ui-Comp</a></div>
                    <div className="my-2">
                        <span className="p fw-lighter">
                            UI-Components is a open source components for your next awesome projects.
                        </span>
                        <br /><br />
                        <span className="p fst-italic">
                            (Lets Make a coding simple)
                        </span>
                    </div>
                </div>
                <div>
                    <FooterLinks link={"#"} text={"Agricreations"} />
                </div>
            </div>
        </div>
    )
}

const FootContentCol2 = () => {
    return (
        <div className="col">
            <div className="card m-2  radius-10 footer">
                <div className="mb-3">
                    <span className="h4">Who We Are</span>
                </div>
                <div className="cursor-pointer ">
                    <div className="card radius-10 bg-theme my-2">
                        <div className="card-body  p-0">
                            <div className="d-flex align-items-center">
                                <div className="brandlogos bg-fade">
                                    <img
                                        src={Images.LOGO}
                                        className="brandlogo m-2"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <h3 className="h4">Agricreations</h3>
                                    <span className="h6 fw-light ">Techey Guys</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FootContentCol4 = () => {
    return (
        <div className="col">
            <div className="card m-2  radius-10 footer">
                <div className="mb-3">
                    <span className="h4 text-light ">Leegal</span>
                </div>
                <FooterLinks link={"#"} text={"Terms and condition"} />
                <FooterLinks link={"#"} text={"Privacy Policy"} />
                <FooterLinks link={"#"} text={"MIT Licence"} />
                <FooterLinks link={"#"} text={"Disclaimer"} />
                <FooterLinks link={"#"} text={"Cookies policy"} />
            </div>
        </div>
    )
}

const FooterLinks = ({ link, text }) => {
    return (
        <div className="footer_link">
            <a className="fw-lighter footer_text" href={link}>{text}</a>
        </div>
    )
}

export default Footer;