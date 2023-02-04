import styled from 'styled-components';

export const ListContainer = styled.div<{isUser: boolean}>`
    display: grid;

    ${({isUser}) => isUser && `
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

    ${({isUser}) => !isUser && `
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