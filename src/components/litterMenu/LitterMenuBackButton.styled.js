import styled from 'styled-components';

export const StyledLitterMenuBackButton = styled.div`
   
   display: flex;
   position: absolute;
   top: 5%;
   right: 2rem;
   border: none;
   cursor: pointer;
   padding: 0;
   z-index: 10;
   background: transparent;
   color: #72a0c3;
   font-size: 1.5rem;
   text-transform: uppercase;
   font-weight: bold;
   
   @media (max-width: 576px) {
    right: 1rem;
    top: 5%;    
   }
   
   &:focus {
    outline: none;
  }
  &:hover {
    color: #567891;
  }
`
