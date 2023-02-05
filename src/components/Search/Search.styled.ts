import styled from 'styled-components';

export const SearchContainer = styled.div<{fixOnHeader: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 20%;

    @media (max-width: 500px) {
        width: 100%;
    }

    ${({fixOnHeader}) =>
        fixOnHeader &&
        `
    position: fixed;
    top: 5px;
    right: 5px;
    z-index: 999;
  `}
`;

export const SearchInput = styled.input`
    width: 50%;
    height: 30px;
    padding: 5px 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    box-sizing: border-box;
    margin-right: 20px;

    @media (max-width: 500px) {
        width: 100%;
    }
`;
