import React, { useState } from "react";

export const ToggleContext =  React.createContext(null);

export function ContextProvider({children}) {
    const [ organicToggle, setOrganicToggle ] = useState(false);
    const [ generalBinsToggle, setGeneralBinsToggle ] = useState(false);
    const [ meToggle, setMeToggle ] = useState(false);
    const [ litterMapMode, setLitterMapMode ] = useState(false);

    return(
        <ToggleContext.Provider value={{ 
            organicToggle: [organicToggle, setOrganicToggle],
            meToggle: [meToggle, setMeToggle],
            litterMapMode: [litterMapMode, setLitterMapMode],
            generalBinsToggle: [generalBinsToggle, setGeneralBinsToggle]}}
        >
            {children}
        </ToggleContext.Provider>
    )
}
