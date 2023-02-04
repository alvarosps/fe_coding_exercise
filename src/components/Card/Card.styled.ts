import styled from 'styled-components';

export const CardContainer = styled.div<{hasNavigation: boolean, isUser: boolean, isLeader: boolean}>`
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
  text-align: center;
  cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
  display: ${props => (props.isUser ? 'grid' : 'flex')};
  justify-content: center;
  align-items: center;
  
  ${({isUser, isLeader}) => isUser && isLeader && `
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: auto;
    grid-template-areas:
        "leader leader leader leader"
        "header main main main";
  `}
  ${({isUser, isLeader}) => isUser && !isLeader && `
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: auto;
    grid-template-areas:
        "header main main main";
  `}

  ${({hasNavigation}) => hasNavigation && `
    &:hover {
        background-color: #cce2ff;
    }
  `}
`;

export const CardAvatar = styled.div<{showAvatar: boolean}>`
  background-color: #f2f2f2;
  margin-left: 5px;
  padding: 25px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  display: ${props => (props.showAvatar ? 'block' : 'none')};
`;

export const CardBody = styled.div`
  padding: 20px;
  grid-area: main;
`;

export const CardBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardLeader = styled.h2`
  margin: 0;
  font-weight: bold;
  grid-area: leader;
  background-color: #dadada;
  padding: 10px;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-weight: bold;
`;

export const CardText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #a0a0a0;
`;