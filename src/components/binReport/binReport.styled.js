import styled from 'styled-components';

export const StyledBinReport = styled.div`
   
   form{
    z-index: 10;
    display: flex;
     flex-direction: column;
    width: 300px;
    height: 400px;
    position: absolute;
    background: #FFFFFF;
    top: 50%;
    margin-top: -200px;
    margin-left: -150px;
    left: 50%;
    border-radius: 19px;
    transition: transform 0.3s ease-in-out;
    transform: ${({ openBinReportForm }) => openBinReportForm ? 'translateY(0)' : 'translateY(-350%)'};
    justify-content: space-evenly;
     text-align: center;
     align-items: center;
   }
        
   logo {
    position: absolute;
    top: 1%;
    left: 1%;
    width: 100%;
    height: auto;
    transform: translate(-115px);
   }

  footer {
    display: flex;
    font-size: 1rem;
    font-weight: bold;
    color: #543A42;
    flex-direction: row;
    justify-content: space-around;

    @media (max-width: 576px) {
      font-size: 0.9rem;
      padding: 1rem 0;
    }
  }
   
   &:focus {
    outline: none;
   }
  
   textarea{
     height: 3em;
     padding: 1px;
     transition: all 0.5s ease;
     border: 1px solid #888;
     outline: none;
     transform: translate (-50%, -50%);
     overflow: auto;
     font-family: sans-serif;


     &:focus{
       height: 4em;
     }
   
   }
      
`;

export const StyledBinCurtain = styled.div `{
  z-index: 9;
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #ebebeb;
  background: linear-gradient(to bottom right, #b5b5b5 0%, #ffbff3 100%);
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ openBinReportForm }) => openBinReportForm ? '0.9' : '0'};

  @media (max-width: 576px) {
    width: 100%;
    height: 100vh;
  }
  
  &:focus {
    outline: none;
  }
`;

export const StyledBinReportText = styled.div `{
  font-weight: normal;
  margin-left: 10px; 
  margin-right: 10px;
  font-family: "Segoe UI",sans-serif;
  color: gray;
  font-size: large;
}
`;

export const StyledFooterButton = styled.div `{

  height: 45px;
  width: 85px;
  line-height: 45px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  background-color: #ca97bd;
  border-radius: 5px;


  @media (max-width: 576px) {
    font-size: 0.9rem;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    color: #b776b0;
    background-color: #7fe0ac;
  }
}
`;
