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
  color: #36454f;
  
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
        background-color: #87ceeb;
    }
  `}
`;

export const CardAvatar = styled.div<{showAvatar: boolean}>`
  width: 50px;
  height: 50px;
  background-color: #f2f2f2;
  margin: 10px;
  padding: 25px;
  color: #36454f;
  border-radius: 30px;
  border: 1px solid #c0c0c0;
  display: ${props => (props.showAvatar ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  overflow: hidden;

  img {
    object-fit: fill;
  }
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
  background-color: #191970;
  color: #87cefa;
  padding: 10px;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-weight: bold;
`;

export const CardText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #C0C0C0;
`;