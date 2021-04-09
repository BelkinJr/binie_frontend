import styled, { keyframes } from 'styled-components'


const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(.25);
    opacity: 0;
  }
`;

export const StyledMenu = styled.nav`

  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #fffdf7;
  height: 100vh;
  text-align: center;
  position: absolute;
  overflow-y: scroll;
  border-radius: 0 0 25px 0;
  width: 13rem;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  z-index: 7;
  
  @media (max-width: 576px) {
     width: 45%;
  }

  a {
    font-family: Arial, Helvetica, sans-serif; 
    font-size: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
    font-weight: 500;
    width: 100%;
    color: #b780bd;
    text-decoration: none;
    transition: color 0.3s linear;
    border-radius: 15px;
    
    @media (max-width: 576px) {
      font-size: 1rem;
      text-align: center;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    &:hover {
      color: #7da886;
    }
  }

  &:hover {
    color: #7da886;
  }
  
  
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledToggle = styled.div`
    font-family: Arial, Helvetica, sans-serif; 
    font-size: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
    font-weight: 500;
    width: 100%;
    color: #b780bd;
    text-decoration: none;
    transition: color 0.3s linear;
    border-radius: 15px;
    visibility: ${({ open }) => open ? 'hidden' : 'visible'};
    animation: ${({ open }) => open ? fadeOut : fadeIn} 2s linear;
    transition: visibility 1s linear;
    
    @media (max-width: 576px) {
      padding-top: 1rem;
      font-size: 1rem;
      text-align: center;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    &:hover {
      color: #7da886;
    }
`;

export const StyledTopToggle = styled.div`
    font-family: Arial, Helvetica, sans-serif; 
    font-size: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
    font-weight: 500;
    width: 100%;
    color: #b780bd;
    text-decoration: none;
    transition: color 0.3s linear;
    border-radius: 15px;
    visibility: ${({ open }) => open ? 'hidden' : 'visible'};
    animation: ${({ open }) => open ? fadeOut : fadeIn} 2s linear;
    transition: visibility 1s linear;
    margin-top:6rem;
  
    @media (max-width: 576px) {
      margin-top:3rem;
      padding-top: 1rem;
      font-size: 1rem;
      text-align: center;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    &:hover {
      color: #7da886;
    }
`;



