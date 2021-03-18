import React from "react";
import { StyledLitterMenuBackButton } from "./LitterMenuBackButton.styled";

const LitterMenuBackButton = ({ stateLitterMapMode, setStateLitterMapMode, setLitterMarker, setSubmitButton }) => {
    return(
        <StyledLitterMenuBackButton onClick={() => {
            setStateLitterMapMode(!stateLitterMapMode);
            setLitterMarker(null);
            setSubmitButton(false)}} 
        >
            BACK
        </StyledLitterMenuBackButton>
    )
}

export default LitterMenuBackButton;
