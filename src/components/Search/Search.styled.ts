import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 20%;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 50%;
  height: 30px;
  padding: 5px 10px;
  border: 1px solid #CCCCCC;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  margin-right: 20px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;