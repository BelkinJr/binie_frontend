import styled, { keyframes }  from 'styled-components';

const fadeLogo = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-10%);
        }
    
`;

const fadeBeta = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-15%);
        }
    
`;

export const StyledLogo = styled.div`
    position: absolute;
    top: 1%;
    left: 42%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 4;
    
    @media (max-width: 576px) {
        left: 30%;    
    }
    
    svg {
        width: 173.7620826px;
        height: 70px;
        animation: ${({ animateLogo }) => animateLogo ? fadeLogo : null} 1s ease-in;           
        @media(max-width: 576px) {
            width: 150px;
            height: 60.42745254px;
        }
    }   
`;

export const StyledBeta = styled.div`
    background: transparent;
    margin-top: 9%;
    border: none;
    cursor: pointer;
    z-index: 4;
    color: #b780bd;
    animation: ${({ animateLogo }) => animateLogo ? fadeBeta : null} 1s ease-in;
    animation-fill-mode: both;
    animation-delay: 1s;
`;


