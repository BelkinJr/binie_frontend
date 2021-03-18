import axios from "axios";

const publicIp = require('public-ip');


const getCurrentPosition = (options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0}) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};

const loadLocation = async () => {
    try {
        return await getCurrentPosition()
    } catch (e) {
        // console.log("Error: " + e.message);
        return e.code
    }
};

async function sendData( reportType, myPos, setSendBinReportState ) {

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
            setTimeout(() => {setSendBinReportState(null)}, 1000);
            return null
        }
        if (locationCoords===2) {
            // console.log("NO LOCATION");
            setTimeout(() => {setSendBinReportState(null)}, 1000);
            return 2
        }
        if (locationCoords===3) {
            // console.log("TIMEOUT");
            setTimeout(() => {setSendBinReportState(null)}, 1000);
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

    if (reportType === 'fullBin') {
        axios.post('/api/full_bin_report/', {
            ip_address: ipAddress,
            longitude: locationCoords.coords.longitude,
            latitude: locationCoords.coords.latitude
        })
            .then((response) => {
                // console.log("RESPONSE AXIOS" + response.status);
                setSendBinReportState("SUCCESS");
                setTimeout(() => {setSendBinReportState(null)}, 2000);
                return response.status
            }, (error) => {
                // console.log("AXIOS ERROR" + error.response.status );
                setSendBinReportState("FAILURE");
                setTimeout(() => {setSendBinReportState(null)}, 2000);
            });
    } else if (reportType === 'extraBin') {
        axios.post('/api/extra_bin_report/', {
            ip_address: ipAddress,
            longitude: locationCoords.coords.longitude,
            latitude: locationCoords.coords.latitude
        })
            .then((response) => {
                // console.log("RESPONSE AXIOS" + response.status);
                setSendBinReportState("SUCCESS");
                setTimeout(() => {setSendBinReportState(null)}, 2000);
                return response.status
            }, (error) => {
                // console.log("AXIOS ERROR" + error.response.status );
                setSendBinReportState("FAILURE");
                setTimeout(() => {setSendBinReportState(null)}, 2000);
            });
    } else if (reportType === 'missingBin') {
        await axios.post('/api/add_bin_request/', {
            ip_address: ipAddress,
            longitude: locationCoords.coords.longitude,
            latitude: locationCoords.coords.latitude
        })
            .then((response) => {
                // console.log("RESPONSE AXIOS" + response.status);
                setSendBinReportState("SUCCESS");
                setTimeout(() => {setSendBinReportState(null)}, 2000);
                return response.status
            }, (error) => {
                // console.log("AXIOS ERROR" + error.response.status );
                setSendBinReportState("FAILURE");
                setTimeout(() => {setSendBinReportState(null)}, 2000);
            });
    }
}

export default sendData;