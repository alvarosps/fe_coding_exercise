import styled from 'styled-components';

export const ListContainer = styled.div<{isUser: boolean}>`
    display: grid;
    grid-template-columns: ${props => props.isUser ? 'repeat(4, minmax(0, 1fr)' : 'repeat(5, minmax(0, 1fr)'});
    grid-template-rows: auto;
`;