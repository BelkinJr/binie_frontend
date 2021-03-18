import React, {useEffect, useState} from 'react';
import Select from 'react-select'

const customStyles = {

    option: (styles, { isFocused, isSelected }) => ({
        ...styles,
        borderBottom: '1px solid pink',
        color: isSelected ? 'white' : 'grey',
        padding: 20,
        backgroundColor: isFocused ? 'lightGreen' : isSelected ? 'lightBlue' : 'null',
    }),
    container: (provided, state) => ({
        ...provided,
        // none of react-select's styles are passed to <Control />
         width: 250,
    }),
    control: (base, state) => ({
        ...base,
        '&:hover': { borderColor: 'gray' }, // border style on hover
        border: '1px solid lightgray', // default border color
        boxShadow: 'none', // no box-shadow
        fontWeight: "normal",
        fontFamily: "Segoe UI",
        color: 'lightgray',
        fontSize: "large",
        // You can also use state.isFocused to conditionally style based on the focus state
    })
}

const options = [
    { value: 'ORG', label: 'Organic' },
    { value: 'INORG', label: 'Inorganic' },
    { value: 'REC', label: 'Recyclable' },
    { value: 'HAZ', label: 'Hazardous' },
]

const LitterTypeSelector = ({ litterTypeSelect, setValue }) => {

    const handleChange = (value) => {
        setValue(value);
    };

    return (
        <Select styles={customStyles}
                isSearchable={false}
                placeholder={"Select litter type"}
                name="LitterType"
                value={litterTypeSelect.value}
                onChange={handleChange}
                options={options}
        />
    )
}

export default LitterTypeSelector;
