import React from "react";
import { Spinner } from "./sendingReoprtAnimation.styled";

const SendingReportAnimation = ({sendBinReportState, sendLitterReportState}) => {

    return(
        (sendBinReportState==="PENDING" || sendLitterReportState==="PENDING") &&
        <Spinner/>
    );
}

export default SendingReportAnimation;