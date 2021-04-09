import styled, {keyframes} from 'styled-components';

const fade = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10%);
    }
`;

export const StyledMap = styled.div`
    
    position: absolute;
    zIndex: 2; 
    top:0; 
    left:0; 
    width: 100%; 
    height: 100%;
    animation: ${({ animateMap }) => animateMap ? fade : null} 1.5s ease-in;

`;
