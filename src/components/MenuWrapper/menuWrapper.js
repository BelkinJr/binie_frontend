import React, {useRef, useState} from "react";
import {useOnClickOutside} from "../../lib/hooks";
import { Burger } from "../index";
import Menu from "../menu/Menu";

const MenuWrapper = ({   setOpenLitterReportForm,
                         setOpenBinReportForm,
                         setBinReportType,
                         openLitterReportForm,
                         openBinReportForm,}) => {
    const [ open, setOpen ] = useState(false);

    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));

    return (
        <div ref={node} >
        { openLitterReportForm===false && openBinReportForm===false && <Burger open={open} setOpen={setOpen}/>}
        <Menu open={open} setOpen={setOpen}
              setOpenLitterReportForm={setOpenLitterReportForm}
              setOpenBinReportForm={setOpenBinReportForm}
              setBinReportType={setBinReportType}/>
        </div>
    )
}

export default MenuWrapper;
