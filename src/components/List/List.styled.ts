import styled from 'styled-components';

export const ListContainer = styled.div<{isUser: boolean}>`
    display: grid;

    ${({isUser}) =>
        isUser &&
        `
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-template-rows: auto;

        @media (max-width: 1064px) {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        @media (max-width: 768px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media (max-width: 500px) {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
    `}

    ${({isUser}) =>
        !isUser &&
        `
        grid-template-columns: repeat(5, minmax(0, 1fr));
        grid-template-rows: auto;

        @media (max-width: 1064px) {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        @media (max-width: 768px) {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        @media (max-width: 468px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    `}
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const PageNumber = styled.button<{active: boolean}>`
    padding: 10px 20px;
    background-color: ${props => (props.active ? '#add8e6' : '#ffffff')};
    border-radius: 20px;
    margin: 0 10px;
    cursor: pointer;

    &:hover {
        background-color: #87ceeb;
    }
`;

export const ItemsPerPage = styled.footer`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PageSelect = styled.select`
    padding: 10px;
    margin-left: 10px;
    border-radius: 4px;
    border: 1px solid #000;
`;
