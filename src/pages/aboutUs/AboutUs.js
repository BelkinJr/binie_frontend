import React, {useEffect, useState} from "react";
import {StyledAboutUs, StyledFooter, StyledSlide} from "./AboutUs.styled";
import ForrestIcon from "./components/ForrestIcon";
import TwitterIcon from "./components/TwitterIcon";
import EmailIcon from "./components/EmailIcon";

const AboutUs = () => {

    const [ animateAboutPage, setAnimateAboutPage ] = useState(true);

    useEffect(() => {
        if (window.sessionStorage.getItem("firstTimeLoadAboutPage")===null) {
            setAnimateAboutPage(true);
            window.sessionStorage.setItem("firstTimeLoadAboutPage", 1);
        } else {
            setAnimateAboutPage(false);
        }
    }, []);

    return(
        <StyledAboutUs>
            <h2 style={{color: "#b780bd"}} >About Us</h2>
            <StyledSlide animateAboutPage={animateAboutPage}><ForrestIcon/></StyledSlide>
            <StyledSlide animateAboutPage={animateAboutPage}><h3>This app aims to keep New Zealand litter-free, clean, healthy and
                beautiful by raising awareness about littering, importance of disposal and letting everyone know where
                the nearest bins are.</h3></StyledSlide>
            <StyledSlide animateAboutPage={animateAboutPage}>
                <h3>Few people like to
                have to carry an empty bottle of juice after they drank it, but no one wants to see it thrown on the ground!
                If you see one lying around - you can let us now by reporting it and helping the community keep the country green!
                    Or if you're looking to dispose of something yourself - maybe the bin you're looking for is just around the corner.
                    Check the app for the closest bins around you!
                </h3></StyledSlide>
            <StyledSlide animateAboutPage={animateAboutPage}>
                <h3>Please keep in mind that the app is still in development and some bins on the map might be in the wrong
                    spot or even not on the map at all! But we're working on it, and you can help by telling us if some
                    bins are misplaced, missing, or request a bin to be added to the map!
                </h3></StyledSlide>
            <StyledSlide animateAboutPage={animateAboutPage}><h3>If you're keen to support us and see the app grow please get in
                touch or tell your friends and family how to make New Zealand a trash-free place :)</h3></StyledSlide>
            <StyledFooter animateAboutPage={animateAboutPage}>
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/appbinie"><TwitterIcon/></a>
                <a href={`mailto:admin@binie.co.nz`}><EmailIcon/></a>
            </StyledFooter>
        </StyledAboutUs>
    );
}

export default AboutUs;
