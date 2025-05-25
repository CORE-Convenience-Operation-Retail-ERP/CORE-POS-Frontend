import styled from "styled-components";

const PageCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;  

  max-width: 480px;
  margin: 0 auto;
  background-color: #F7F8FA; 
  overflow: hidden;
  padding-bottom: 64px;

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

export default PageCardWrapper;
