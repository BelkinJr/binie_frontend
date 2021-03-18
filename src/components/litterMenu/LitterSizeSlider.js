import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { SizeSlider } from "./LitterSizeSlider.styled";


const useStyles = makeStyles({
    root: {
        width: 250,
    },
});

const LitterSizeSlider = ({ setLitterSliderState, litterSliderState }) =>  {

    const classes = useStyles();

    function valuetext(value) {
        return `${value}`; //попробуй потом отрубить говно
    }

    const handleSliderChange = (event, newValue) => {
        setLitterSliderState(newValue);
    };

    // function handleReset(sendReportState) {
    //     if(sendReportState==='SUCCESS'){valuetext(1)}
    // }

    return (
        <div className={classes.root}>
            <Typography id="discrete-slider" gutterBottom style={{marginBottom: "20px", color: "gray", fontWeight: "normal", fontSize: "large", fontFamily: "Segoe UI"}}>
                Please select litter size
            </Typography>
            <SizeSlider
                value={typeof litterSliderState === 'number' ? litterSliderState : 0}
                onChange={handleSliderChange}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
            />
        </div>
    );
};

export default LitterSizeSlider;