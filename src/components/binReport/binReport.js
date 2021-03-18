import React from 'react';
import { StyledBinReport, StyledBinCurtain, StyledFooterButton, StyledBinReportText } from "./binReport.styled";
import sendData from "./createReport";


const BinReport = ({ openBinReportForm,
                    setOpenBinReportForm,
                    binReportType,
                    setBinReportType,
                    sendBinReportState,
                    setSendBinReportState,
                    myPos}) => {

    return (
        <StyledBinReport openBinReportForm={openBinReportForm}>
            {openBinReportForm && <StyledBinCurtain openBinReportForm={openBinReportForm}/>}
            <div>
                <form>
                    <header style={{fontWeight: "500", color:"#b776b0", marginBottom:"20px"}}>Bin Report</header>
                    { binReportType==='fullBin' && <StyledBinReportText>Do you want to report a full bin at your location?</StyledBinReportText> }
                    { binReportType==='extraBin' && <StyledBinReportText>Do you want to report an incorrectly placed bin marker at your location?</StyledBinReportText> }
                    { binReportType==='missingBin' && <StyledBinReportText>Do you want to report a bin missing on the map at your location?</StyledBinReportText> }
                    <footer>
                        <StyledFooterButton onClick={() => { if (sendBinReportState!=null) {alert("Previous report is still being processed."); return}
                                                    setOpenBinReportForm(false)
                                                    setSendBinReportState("PENDING")
                                                    let result  = sendData(binReportType, myPos, setSendBinReportState)
                                                    result.then(function (value) {}, function (reason){})
                                                    }} style={{marginRight: "5px"}}>Submit</StyledFooterButton>
                        <StyledFooterButton onClick={() => {
                            setOpenBinReportForm(false);
                            setBinReportType(null);
                            }} style={{marginLeft: "5px"}}>Back</StyledFooterButton>
                    </footer>
                </form>
            </div>
        </StyledBinReport>
    );
}

export default BinReport;
