import React, {useEffect, useState} from 'react';
import './App.css';
import AboutUs from './pages/aboutUs';
import  Map from './pages/map';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MenuWrapper, Logo } from "./components";
import  LitterReport from "./components/litterMenu/LitterReport";
import { ToggleContext } from "./lib/toggleContext";
import BinReport from "./components/binReport/binReport";
import SendingReportAnimation from"./components/animations/sendingReportAnimation";
import ReportSentAnimation from "./components/animations/reportSentAnimation";

export default function App() {

  const { litterMapMode } = React.useContext(ToggleContext);

  const [ stateLitterMapMode ] = litterMapMode;
  const [ openLitterReportForm, setOpenLitterReportForm ] = useState(false);
  const [ openBinReportForm, setOpenBinReportForm ] = useState(false);
  const [ binReportType, setBinReportType ] = useState(null);

    const [ sendBinReportState, setSendBinReportState ] = useState(null);
    const [ sendLitterReportState, setSendLitterReportState ] = useState(null);

  const [ myPos, setMyPos ] = useState({ lat: -36.846785, lng: 14.766059, state: 0 });

    return (
      <div style={{height: "100vh", width: "100%", position:'fixed', top:0, left:0}}>
          <LitterReport openLitterReportForm={openLitterReportForm}
                        setOpenLitterReportForm={setOpenLitterReportForm}
                        sendLitterReportState={sendLitterReportState}
                        setSendLitterReportState={setSendLitterReportState}
                        myPos={myPos}>
          </LitterReport>
          <BinReport openBinReportForm={openBinReportForm}
                     setOpenBinReportForm={setOpenBinReportForm}
                     binReportType={binReportType}
                     setBinReportType={setBinReportType}
                     sendBinReportState={sendBinReportState}
                     setSendBinReportState={setSendBinReportState}
                     myPos={myPos}>
          </BinReport>
          <div>
            <Logo/>
            <Map myPos={myPos} setMyPos={setMyPos}/>
          </div>
          <BrowserRouter>
              <Switch>
                  <Route path='/about' component={AboutUs}/>

              </Switch>
              <MenuWrapper stateLitterMapMode={stateLitterMapMode}
                       openLitterReportForm={openLitterReportForm}
                       setOpenLitterReportForm={setOpenLitterReportForm}
                       openBinReportForm={openBinReportForm}
                       setOpenBinReportForm={setOpenBinReportForm}
                       setBinReportType={setBinReportType}/>
          </BrowserRouter>
          <SendingReportAnimation sendBinReportState={sendBinReportState} sendLitterReportState={sendLitterReportState}/>
          <ReportSentAnimation sendBinReportState={sendBinReportState} sendLitterReportState={sendLitterReportState}/>
      </div>
  );
}
