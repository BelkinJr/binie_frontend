import React, {useEffect, useState} from 'react';
import { bool } from 'prop-types';
import { StyledMenu, StyledToggle, StyledTopToggle } from './Menu.styled';
import { Switch, Route, Link} from 'react-router-dom';
import MenuLogo from "../menuLogo/MenuLogo";

import { ToggleContext } from "../../lib/toggleContext";

const Menu = ({ open, setOpen, setOpenLitterReportForm ,setOpenBinReportForm, setBinReportType}) => {

    const { organicToggle } = React.useContext(ToggleContext);
    const { generalBinsToggle } = React.useContext(ToggleContext);
    const [ stateOrganicToggle, setStateOrganicToggle ] = organicToggle;
    const [ stateGeneralBinsToggle, setStateGeneralBinsToggle ] = generalBinsToggle;
    const [ mobileDevice, setMobileDevice ] = useState(true);

    let recBckgrndColor = null;
    let genBckgrndColor = null;
    if (stateOrganicToggle) { recBckgrndColor = "#e0fcd9" }
    if (stateGeneralBinsToggle) { genBckgrndColor = "#e0fcd9" }


    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    useEffect(() => setMobileDevice(isTouchDevice()), [isTouchDevice])


    return (
        <StyledMenu open={open}>
            <Switch>
                <Route path='/' exact>
                    <StyledTopToggle  style={{background: recBckgrndColor}} onClick={() => setStateOrganicToggle(!stateOrganicToggle)}>
                        {stateOrganicToggle && <div>Show</div>} {(!stateOrganicToggle) && <div>Hide</div>}Recycling Bins
                    </StyledTopToggle>
                </Route>
                <Route path={['/contact', '/about']}>
                    <div className="a" style={{marginTop:'6rem'}}  onClick={() => setOpen(!open)}>
                        <Link to={'/'} >
                            Back
                        </Link>
                    </div>
                </Route>
            </Switch>
            <Switch>
                <Route path='/' exact>
                    <StyledToggle style={{background: genBckgrndColor}} onClick={() => setStateGeneralBinsToggle(!stateGeneralBinsToggle)}>
                        {stateGeneralBinsToggle && <div>Show</div>} {(!stateGeneralBinsToggle) && <div>Hide</div>}General Bins
                    </StyledToggle>
                </Route>
                <Route path="/about">
                    <div/>
                </Route>
            </Switch>
            <Switch>
                <Route path='/' exact>
                    {mobileDevice && <StyledToggle onClick={() =>  {setOpen(!open); setOpenLitterReportForm(true)}}>
                        Report Litter
                    </StyledToggle>}
                </Route>
                <Route path="/about">
                    <div/>
                </Route>
            </Switch>
            <Switch>
                <Route path='/' exact>
                    {mobileDevice && <StyledToggle onClick={() =>  {setOpen(!open); setOpenBinReportForm(true); setBinReportType('fullBin')}}>
                        Report Full Bin
                    </StyledToggle>}
                </Route>
                <Route path="/about">
                    <div/>
                </Route>
            </Switch>
            <Switch>
                <Route path='/' exact>
                    {mobileDevice && <StyledToggle onClick={() =>  {setOpen(!open); setOpenBinReportForm(true); setBinReportType('missingBin')}}>
                        Report Missing Bin
                    </StyledToggle>}
                </Route>
                <Route path="/about">
                    <div/>
                </Route>
            </Switch>
            <Switch>
                <Route path='/' exact>
                    {mobileDevice && <StyledToggle onClick={() =>  {setOpen(!open); setOpenBinReportForm(true); setBinReportType('extraBin')}}>
                        Report Extra Bin
                    </StyledToggle>}
                </Route>
                <Route path="/about">
                    <div/>
                </Route>
            </Switch>
            <Switch>
                <Route path='/' exact>
                    <StyledToggle style={{padding: "0.5rem", paddingTop: "1rem"}} onClick={() => setOpen(!open)}>
                        <Link to={'/about'}>About Us
                        </Link>
                    </StyledToggle>
                </Route>
                <Route path="/about">
                    <div/>
                </Route>
            </Switch>
            <MenuLogo/>
        </StyledMenu>
    )
}

Menu.propTypes = {
    open: bool.isRequired,
}

export default Menu;
