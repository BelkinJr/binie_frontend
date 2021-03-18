import React, {useState} from "react";
import { StyledLitterReport, StyledLitterCurtain, StyledFooterButton} from "./LitterReport.styled";
import LitterSizeSlider from "./LitterSizeSlider";
import LitterTypeSelector from "./LitterTypeSelect";

import axios from "axios";

const publicIp = require('public-ip');


const getCurrentPosition = (options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 1000}) => {
    return new Promise((resolve, reject) => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        }
    });
};

const loadLocation = async () => {
    try {
        return await getCurrentPosition()
    } catch (e) {
        console.log("Error: " + e.message);
        return e.code
    }
}

async function sendData( litterSize, litterType, myPos, setSendLitterReportState,  ) {

    const ipAddress = await publicIp.v4({
        fallbackUrls: [
            'https://ifconfig.co/ip'
        ]
    });

    let locationCoords;

    if (myPos.state === 0) {
        locationCoords = await loadLocation()
        if (locationCoords===1) {
            alert("You must enable geolocation tracking to submit a report.");
            setTimeout(() => {setSendLitterReportState(null)}, 1000);
            return null
        }
        if (locationCoords===2) {
            // console.log("NO LOCATION");
            setTimeout(() => {setSendLitterReportState(null)}, 1000);
            return 2
        }
        if (locationCoords===3) {
            // console.log("TIMEOUT");
            setTimeout(() => {setSendLitterReportState(null)}, 1000);
            return 3
        }
    } else {
        locationCoords = {
            coords: {
                longitude: 0,
                latitude: 0
            }
        }
        locationCoords.coords.longitude = myPos.lng;
        locationCoords.coords.latitude = myPos.lat;
    }

    axios.post('/api/litter_report/', {
        ip_address: ipAddress,
        longitude: locationCoords.coords.longitude,
        latitude: locationCoords.coords.latitude,
        litter_type: litterType.value,
        size: litterSize,
    })
        .then((response) => {
            // console.log("RESPONSE AXIOS" + response.status);
            setSendLitterReportState("SUCCESS");
            setTimeout(() => {setSendLitterReportState(null)}, 2000);
            return response.status
        }, (error) => {
            // console.log("AXIOS ERROR" + error.response.status );
            setSendLitterReportState("FAILURE");
            setTimeout(() => {setSendLitterReportState(null)}, 2000);
        });
}

const LitterReport = ({ openLitterReportForm,
                          setOpenLitterReportForm,
                          sendLitterReportState,
                          setSendLitterReportState,
                          myPos }) => {

    const [ litterSliderState, setLitterSliderState ] = useState(1);
    const resetSlider = () => {
        setLitterSliderState(1);
    };

    //селект часть
    const [litterTypeSelect, setLitterTypeSelect] = useState({value: null});

    const setValue = (value) => {
        setLitterTypeSelect(prevState => ({
            ...prevState,
            value
        }))
    }

    const resetForm = () => {
        setLitterTypeSelect({value: null});
    };

    return(
        <StyledLitterReport openLitterReportForm={openLitterReportForm}>
            {openLitterReportForm && <StyledLitterCurtain openLitterReportForm={openLitterReportForm} />}
            <div>
            <form>
                <header style={{fontWeight: "500", color:"#b776b0", marginBottom:"20px"}}>Report Litter At My Location</header>
                <LitterSizeSlider litterSliderState={litterSliderState} setLitterSliderState={setLitterSliderState}/>
                <LitterTypeSelector litterTypeSelect={litterTypeSelect}
                                    setLitterTypeSelect={setLitterTypeSelect}
                                    setValue={setValue}/>
                <footer>
                    <StyledFooterButton onClick={() => { if (sendLitterReportState!=null) {alert("Previous report is still being processed."); return}
                        if (litterTypeSelect.value===null)   {alert("Please select litter type."); return}
                        setOpenLitterReportForm(false)
                        setSendLitterReportState("PENDING")
                        let result  = sendData(litterSliderState, litterTypeSelect.value, myPos, setSendLitterReportState)
                        result.then(function (value) {}, function (reason){})
                        resetForm();
                        resetSlider();}} style={{marginRight: "15px"}}>Submit</StyledFooterButton>
                    <StyledFooterButton onClick={() => {setOpenLitterReportForm(false); resetForm(); resetSlider();}} style={{marginLeft: "15px"}}>Cancel</StyledFooterButton>
                </footer>
            </form>
            </div>
        </StyledLitterReport>
    )
}

export default LitterReport;
