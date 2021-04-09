import styled, {keyframes} from 'styled-components';

const fadeAbout = keyframes`
    0% {
        opacity: 0;
    }
`;

export const StyledAboutUs = styled.div`
  -ms-overflow-style: none;
  background-color: #f2f2f2;
  padding-left: 10rem;
  padding-right: 10rem;
  padding-top: 25px;
  padding-bottom: 80px;
  font-size: 20px;   
  z-index: 5;
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  text-align: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  overflow-y: scroll;
       
  @media (max-width: 576px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
  
  ::-webkit-scrollbar {
    display: none;
  }  
`;

export const StyledFooter = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-around;
        
    animation: ${({ animateAboutPage }) => animateAboutPage ? fadeAbout : null} 1s ease-in;
    animation-fill-mode: both;
    animation-delay: 6s;
`;

export const StyledSlide = styled.div`
    color: #b780bd;
    z-index: 6;   
    width: 100%;
    height: 100vh;
    
    :first-child {
      animation: ${({ animateAboutPage }) => animateAboutPage ? fadeAbout : null} 1s ease-in;
    }
    
    :nth-child(2) {
      animation: ${({ animateAboutPage }) => animateAboutPage ? fadeAbout : null} 1s ease-in;
      animation-fill-mode: both;
      animation-delay: 1s;
    }
    
    :nth-child(3) {
        animation: ${({ animateAboutPage }) => animateAboutPage ? fadeAbout : null} 1s ease-in;
        animation-fill-mode: both;
        animation-delay: 2s;
    }
    :nth-child(4) {
        animation: ${({ animateAboutPage }) => animateAboutPage ? fadeAbout : null} 1s ease-in;
        animation-fill-mode: both;
        animation-delay: 3s;
    }
    :nth-child(5) {
        animation: ${({ animateAboutPage }) => animateAboutPage ? fadeAbout : null} 1s ease-in;
        animation-fill-mode: both;
        animation-delay: 4s;
    }
    :nth-child(6) {
        animation: ${({ animateAboutPage }) => animateAboutPage ? fadeAbout : null} 1s ease-in;
        animation-fill-mode: both;
        animation-delay: 5s;
    }
  
    @media (max-width: 576px) {
        font-size: 0.55rem;
    }
`;
