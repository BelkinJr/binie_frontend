import styled from 'styled-components';

export const StyledBinMenu = styled.div`
  display:flex;
  -ms-overflow-style: none;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  width: 25%;
  overflow-y: scroll;
  transition: all 0.3s ease-in-out;
  transform: ${({ openBinMenu }) => openBinMenu ? 'translateX(0)' : 'translateX(100%)'};
  opacity: ${({ openBinMenu }) => openBinMenu ? '100' : '0'};

  background-color: #222222;
  top: 0;
  right: 0;
  z-index: 1;
  
  .svgBox {
    padding-top: 1rem;
    height: 10vh;
    width: 100%;
    position: center;
    
  }
  
  a {
    font-size: 1rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #DE6288;
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: 576px) {
      font-size: 1rem;
      text-align: left;
      padding: 1rem 0;
    }

    &:hover {
      color: #343078;
    }
  }

  @media (max-width: 576px) {
     top: auto;
     height: 20vh;
     width: 100%;
     bottom: 0;
     background: #FFFFFF;
     flex-direction: row;
     overflow-x: scroll;
     left: 0;
     padding-top: 1rem 0;
     padding-right: 1rem 0;
     padding-bottom: 1rem 0;
     padding-left: 0.5rem ;
     transition: all 0.3s ease-in-out;
     transform: ${({ openBinMenu }) => openBinMenu ? 'translateY(0)' : 'translateY(100%)'};
     opacity: ${({ openBinMenu }) => openBinMenu ? '100' : '0'};

  }

  ::-webkit-scrollbar {
    display: none;
  }
`
