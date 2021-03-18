import React from "react";
import { StyledBinMenu } from './BinMenu.styled';
import ContextBin2 from "../bins/contextBin2";
import ContextBin from "../bins/contextBin";

const BinMenu = ({openBinMenu, binData}) => {
console.log(binData, openBinMenu)
    return (
        <StyledBinMenu openBinMenu={openBinMenu}>
            { (binData && binData.category === "organic") && (
            <>
            <a> bin</a>
            <div className="svgBox" >
                <ContextBin2/>
            </div>
            </>)
            }
            {binData!=null && binData.category === "non-organic" &&
            <a>{binData.category} bin</a> &&
            <div className="svgBox" >
                <ContextBin/>
            </div>}
        </StyledBinMenu>
    )
}

export default BinMenu;
